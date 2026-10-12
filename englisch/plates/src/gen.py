import math
INK="#23402B"; PAPER="#F4EEDD"
def head():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 933" width="1400" height="933" fill="none" stroke="{INK}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2">
<defs>
<pattern id="h1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 3H6" stroke-width="1.1"/></pattern>
<pattern id="h2" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 2H4" stroke-width="1"/></pattern>
<pattern id="h3" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-50)"><path d="M0 2.5H5" stroke-width=".9"/></pattern>
<symbol id="leaf" overflow="visible"><path d="M0 0C-4-6-16-6-21-3C-17-11-23-17-19-22C-13-20-10-24-8-28C-6-34-3-39 0-46C3-39 6-34 8-28C10-24 13-20 19-22C23-17 17-11 21-3C16-6 4-6 0 0Z" fill="{PAPER}"/><path d="M0 0V-38M0-12L-14-8M0-12L14-8M0-24L-9-24M0-24L9-24" stroke-width="1.2"/><path d="M-3-10C-14-8-18-4-18-3M3-10C14-8 18-4 18-3" stroke-width="1" /><path d="M2 -6C8-6 15-5 19-3" fill="url(#h2)" stroke="none"/></symbol>
</defs>
'''
def leaf(x,y,rot,s=1): s=s*1.35; return f'<use href="#leaf" transform="translate({x} {y}) rotate({rot}) scale({s})"/>'
def ivy(x0,y0,pts,leaves):
    d=f"M{x0} {y0} "+" ".join(f"Q{a} {b} {c} {e}" for a,b,c,e in pts)
    out=f'<path d="{d}" stroke-width="3"/>'
    for l in leaves: out+=leaf(*l)
    return out
def shade(d,pat="h1"): return f'<path d="{d}" fill="url(#{pat})" stroke="none"/>'
def crescent(cx,cy,rx,ry,dx,dy,pat="h1",cid="c"):
    return (f'<clipPath id="{cid}"><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/></clipPath><g clip-path="url(#{cid})">'
            f'<path fill-rule="evenodd" fill="url(#{pat})" stroke="none" d="M{cx-rx-5} {cy-ry-5}h{2*rx+10}v{2*ry+10}h-{2*rx+10}z M{cx+dx-rx} {cy+dy}a{rx} {ry} 0 1 0 {2*rx} 0a{rx} {ry} 0 1 0 -{2*rx} 0z"/></g>')
def ground(cx,y,w): return f'<path d="M{cx-w} {y}Q{cx} {y+14} {cx+w} {y}" stroke-width="1.4"/><path d="M{cx-w*.8} {y+8}Q{cx} {y+22} {cx+w*.8} {y+8}" stroke-width="1"/>'

def finish(o,cx,cy,k=1.0):
    o=o.replace("</defs>\n",f'</defs>\n<g transform="translate(700 466) scale({k}) translate({-cx} {-cy})">\n',1)
    return o+"</g></svg>" if not o.endswith("</svg>") else o[:-6]+"</g></svg>"
