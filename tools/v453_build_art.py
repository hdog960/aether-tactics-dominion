"""Dominion v4.5.3: convert a four-character image into painted game atlases."""
from pathlib import Path
from PIL import Image
import io, json, math, os, urllib.request
import cv2
import numpy as np

url=os.environ['SOURCE_URL']
if not url.startswith('https://'): raise ValueError('HTTPS source only')
with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'DominionAssetPipeline/1.0'}),timeout=60) as response:
    source=Image.open(io.BytesIO(response.read())).convert('RGB')
W,H=source.size
if min(W,H)<720 or abs(W-H)/max(W,H)>.09:
    raise RuntimeError('Expected a large square 2-by-2 character sheet')
out=Path('art');out.mkdir(exist_ok=True)
characters=[]
for i,(sx,sy) in enumerate([(0,0),(W//2,0),(0,H//2),(W//2,H//2)]):
    rgb=np.asarray(source.crop((sx+4,sy+4,sx+W//2-4,sy+H//2-4)))
    h,w=rgb.shape[:2]
    gray=rgb.mean(2);spread=rgb.max(2)-rgb.min(2)
    matte=((spread<14)&(gray>171)&(gray<231)).astype(np.uint8)
    _,labels,stats,centers=cv2.connectedComponentsWithStats(matte,8)
    edges=set(np.unique(np.r_[labels[0],labels[-1],labels[:,0],labels[:,-1]]))-{0}
    mask=np.full((h,w),cv2.GC_PR_FGD,dtype=np.uint8)
    mask[matte>0]=cv2.GC_PR_BGD
    mask[np.isin(labels,list(edges))]=cv2.GC_BGD
    mask[:3]=0;mask[-3:]=0;mask[:,:3]=0;mask[:,-3:]=0
    seed=(((spread>75)&(gray<245))|((gray<90)&(spread>18))).astype(np.uint8)
    mask[cv2.erode(seed,np.ones((3,3),np.uint8)).astype(bool)]=cv2.GC_FGD
    bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
    cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),mask,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
    alpha=np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),255,0).astype(np.uint8)
    total,lbl,areas,locations=cv2.connectedComponentsWithStats((alpha>0).astype(np.uint8),8)
    main=1+areas[1:,cv2.CC_STAT_AREA].argmax()
    keep=(lbl==main)
    for j in range(1,total):
        if j!=main and areas[j,cv2.CC_STAT_AREA]>=95 and np.linalg.norm(locations[j]-locations[main])<w*.66:
            keep|=(lbl==j)
    alpha=cv2.GaussianBlur(keep.astype(np.uint8)*255,(3,3),.55)
    cut=Image.fromarray(np.dstack((rgb,alpha)),'RGBA')
    cut=cut.crop(cut.getbbox())
    coverage=np.asarray(cut.getchannel('A')).mean()/255
    if not .13<coverage<.90: raise RuntimeError(f'Alpha extraction rejected for {i}: {coverage:.3f}')
    characters.append(cut)

# Each cropped card image contains the exact same painted figure as its unit.
colors=[(28,61,108),(19,74,56),(78,50,45),(63,26,94)]
cards=Image.new('RGB',(512,96))
for i,im in enumerate(characters):
    y,x=np.mgrid[:96,:128]
    glow=np.maximum(0,1-np.sqrt(((x-64)/125)**2+((y-48)/89)**2)*1.4)
    noise=np.random.default_rng(1243+i).normal(0,2,(96,128))
    bg=np.zeros((96,128,3),dtype=np.uint8)
    for k in range(3):
        bg[:,:,k]=np.clip(colors[i][k]*(.64+.4*(1-y/96))+(22,25,31)[k]*glow+noise,0,255)
    card=Image.fromarray(bg,'RGB').convert('RGBA')
    height=124;width=round(height*im.width/im.height)
    body=im.resize((width,height),Image.Resampling.LANCZOS)
    card.alpha_composite(body,((128-width)//2,-1))
    cards.paste(card.convert('RGB'),(i*128,0))
cards.save(out/'cards-creatures-v453.webp','WEBP',quality=89,method=6)

sprites=Image.new('RGBA',(384,120))
tiles=[]
for i,im in enumerate(characters):
    scale=min(92/im.width,116/im.height)
    body=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
    tile=Image.new('RGBA',(96,120))
    tile.alpha_composite(body,((96-body.width)//2,118-body.height))
    sprites.alpha_composite(tile,(i*96,0));tiles.append(tile)
sprites.save(out/'units-creatures-v453.png',optimize=True)

def pose(tile,kind,n):
    rgba=np.asarray(tile)
    y,x=np.mgrid[:120,:96].astype(np.float32)
    up=np.clip((96-y)/68,0,1);leg=np.clip((y-70)/42,0,1)
    if kind=='idle':
        t=n*math.pi/2;shift=1.25*math.sin(t)*up
        vertical=(1-math.cos(t))*.675;shear=.0015*math.cos(t)*(120-y)
    elif kind=='walk':
        t=n*math.pi/3;shift=2.7*math.sin(t)*leg*np.tanh((x-48)/13)+1.45*math.sin(t)*up
        vertical=1.5*abs(math.sin(t));shear=.004*math.cos(t)*(120-y)
    elif kind=='attack':
        shift=[-4,-2,6,2][n]*(.26+.74*up)
        vertical=[1,0,-1,0][n];shear=[.018,-.020,-.032,.008][n]*(120-y)
    elif kind=='hurt':
        shift=[-5,-2,1][n]*(.25+.75*up)
        vertical=[0,1,1][n];shear=[-.026,-.01,.005][n]*(120-y)
    else:
        t=n/4;shift=(-3-4*t)*(1-leg*.6)
        vertical=-(4+30*t)*np.clip((120-y)/120,0,1)
        shear=(-.02-.025*t)*(120-y)
    data=cv2.remap(rgba,(x-shift-shear).astype(np.float32),(y+vertical).astype(np.float32),cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0,0))
    if kind=='defeat': data[:,:,3]=(data[:,:,3].astype(float)*(1-n*.155)).astype(np.uint8)
    if kind=='hurt' and n==1:
        a=data[:,:,3].astype(float)/255
        data[:,:,:3]=np.clip(data[:,:,:3].astype(float)*.82+np.array([44,29,30])*a[:,:,None],0,255).astype(np.uint8)
    return Image.fromarray(data,'RGBA')
anim=[('idle',n) for n in range(4)]+[('walk',n) for n in range(6)]+[('attack',n) for n in range(4)]+[('hurt',n) for n in range(3)]+[('defeat',n) for n in range(5)]
frames=Image.new('RGBA',(2112,480))
for i,tile in enumerate(tiles):
    for j,(name,n) in enumerate(anim):
        frames.alpha_composite(pose(tile,name,n),(j*96,i*120))
frames.save(out/'battlefield-frames-v453.webp','WEBP',quality=85,method=6)

assert cards.size==(512,96) and sprites.size==(384,120) and frames.size==(2112,480)
assert len({hash(cards.crop((i*128,0,(i+1)*128,96)).tobytes()) for i in range(4)})==4
for i,tile in enumerate(tiles):
    a=np.asarray(tile.getchannel('A'))
    if (a<12).sum()<800 or (a>80).sum()<300: raise RuntimeError('Sprite opacity failed')
    distinct={hash(frames.crop((j*96,i*120,(j+1)*96,(i+1)*120)).tobytes()) for j in range(22)}
    if len(distinct)<18: raise RuntimeError('Repeated animation poses')
manifest={'version':'4.5.3','characters':['M','N','O','P'],'frames_per_character':22,
 'atlases':{p.name:{'dimensions':Image.open(p).size,'bytes':p.stat().st_size}
           for p in (out/'cards-creatures-v453.webp',out/'units-creatures-v453.png',out/'battlefield-frames-v453.webp')}}
(out/'v453-art-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
