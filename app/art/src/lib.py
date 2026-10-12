"""Bausteine für die Kurs-Illustrationen (Typesafe-Stil: Tinte, Pink, harte Schatten). Ausgabe: app/art/<id>.svg"""
import os
INK="#1E1E1E"; PINK="#F386A1"; SOFT="#FBDDE3"; PAPER="#FEFEFE"; GRAY="#8A8A86"; MINT="#5CE0A8"; PANEL="#E9E9E6"
def head(w=600,h=340):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none" stroke="{INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">\n'
def shadow(x,y,w,h,d=8): return f'<rect x="{x+d}" y="{y+d}" width="{w}" height="{h}" fill="{INK}" stroke="none"/>'
def box(x,y,w,h,fill=PAPER,d=8): return shadow(x,y,w,h,d)+f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"/>'
def win(x,y,w,h,bar=PINK,d=8):
    return box(x,y,w,h,PAPER,d)+f'<rect x="{x}" y="{y}" width="{w}" height="30" fill="{bar}"/>'+"".join(f'<circle cx="{x+16+i*17}" cy="{y+15}" r="4.5" fill="{PAPER}" stroke-width="3"/>' for i in range(3))
def lines(x,y,ws,gap=18,col=GRAY,sw=5): return "".join(f'<path d="M{x} {y+i*gap}h{w}" stroke="{col}" stroke-width="{sw}"/>' for i,w in enumerate(ws))
def person(cx,cy,s=1,fill=SOFT,dash=False):
    d=' stroke-dasharray="7 6"' if dash else ''
    f="none" if dash else fill
    return f'<g{d}><circle cx="{cx}" cy="{cy}" r="{16*s}" fill="{f}"/><path d="M{cx-26*s} {cy+52*s}c2-24 12-34 {26*s}-34s{24*s} 10 {26*s} 34Z" fill="{f}"/></g>'
def bubble(x,y,w,h,fill=PINK,tail="left",d=8):
    tx=x+28 if tail=="left" else x+w-48
    p=f'M{x} {y}H{x+w}V{y+h}H{tx+24}L{tx}{" "}{y+h+26}L{tx+4} {y+h}H{x}Z'
    return f'<path d="{p}" fill="{INK}" stroke="none" transform="translate({d} {d})"/><path d="{p}" fill="{fill}"/>'
def badge(cx,cy,r=26,kind="check",fill=PINK):
    g=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'
    if kind=="check": g+=f'<path d="M{cx-r*.5} {cy+1}l{r*.35} {r*.35} {r*.65}-{r*.78}" stroke-width="6"/>'
    if kind=="plus": g+=f'<path d="M{cx-r*.5} {cy}h{r}M{cx} {cy-r*.5}v{r}" stroke-width="6"/>'
    if kind=="minus": g+=f'<path d="M{cx-r*.5} {cy}h{r}" stroke-width="6"/>'
    return g
def coin(cx,cy,r=26,fill=SOFT): return f'<circle cx="{cx+5}" cy="{cy+5}" r="{r}" fill="{INK}" stroke="none"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/><circle cx="{cx}" cy="{cy}" r="{r*.62}" stroke-width="3"/>'
def save(name,body,w=600,h=340):
    out=os.path.join(os.path.dirname(__file__),"..",name+".svg")
    open(out,"w").write(head(w,h)+body+"</svg>\n"); print(name,len(body))
