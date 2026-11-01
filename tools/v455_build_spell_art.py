"""Create original Dominion v4.5.5 painted spell atlas from supplied source sheet."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json
src=Path('art/sources/v455-original-spells.png')
if not src.exists(): raise FileNotFoundError('Original painted U/V/W/X source art missing')
image=Image.open(src).convert('RGB')
W,H=image.size
if W<800 or H<800 or abs(W-H)/max(W,H)>.10:
    raise ValueError(f'Expected a large square painted four-spell sheet, got {W}x{H}')
out=Image.new('RGB',(512,96))
palette=[]
for i,(col,row) in enumerate(((0,0),(1,0),(0,1),(1,1))):
    bw=W//2;bh=H//2
    quad=image.crop((col*bw+6,row*bh+6,(col+1)*bw-6,(row+1)*bh-6))
    thumb=ImageOps.fit(quad,(128,96),Image.Resampling.LANCZOS,centering=(.5,.5))
    out.paste(thumb,(i*128,0))
    palette.append(hashlib.sha256(thumb.tobytes()).hexdigest())
if len(set(palette))!=4: raise RuntimeError('The spell paintings must be four distinct scenes')
Path('art').mkdir(exist_ok=True)
out.save('art/cards-spells-v455.webp','WEBP',quality=91,method=6)
manifest={'version':'4.5.5','keys':['U','V','W','X'],
 'names':['Mirror Breach','Gale Step','Ember Covenant','Crescent Refrain'],
 'width':512,'height':96,'cell_width':128,'cell_height':96,
 'source':str(src),'unique_paintings':4}
Path('art/v455-spell-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
