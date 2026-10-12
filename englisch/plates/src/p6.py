from gen import *
o=head()
# --- basket (x 220-560)
# contents: apple + loaf peeking
o+=f'<path d="M290 470C280 420 340 395 390 410C430 395 500 420 490 475Z" fill="{PAPER}"/>'+shade("M440 420C480 430 495 455 490 475H420Z","h1")+'<path d="M300 450Q340 440 378 452M345 430Q380 425 410 438" stroke-width="1.6"/>'
o+=f'<path d="M455 450C430 425 395 440 398 480C400 515 440 520 455 510C470 520 505 505 508 475C510 440 478 428 455 450Z" fill="{PAPER}"/>'+crescent(455,478,52,55,-18,-8,"h1","ba")+'<path d="M455 450C430 425 395 440 398 480C400 515 440 520 455 510C470 520 505 505 508 475C510 440 478 428 455 450Z"/><path d="M455 450Q458 436 466 426" stroke-width="3"/>'
# basket body
o+=f'<path d="M230 470H550L520 650Q390 690 260 650Z" fill="{PAPER}"/>'
o+=shade("M470 470H550L520 650Q490 660 460 662Z","h1")
# weave
for i,y in enumerate(range(495,650,24)):
    o+=f'<path d="M{236+i*5} {y}Q390 {y+14} {544-i*5} {y}" stroke-width="1.2"/>'
for x in range(250,545,32):
    t=(x-390)/160
    o+=f'<path d="M{x} 472L{x+ (x-390)*-.18:.0f} 650" stroke-width="1.1" opacity=".75"/>'
o+='<path d="M230 470H550L520 650Q390 690 260 650Z"/>'
o+=f'<path d="M222 462H558V482H222Z" fill="{PAPER}"/><path d="M222 472H558" stroke-width="1"/>'
# handle
o+=f'<path d="M240 462C210 330 330 270 390 270C450 270 570 330 540 462" stroke-width="14" stroke="{INK}"/><path d="M240 462C210 330 330 270 390 270C450 270 570 330 540 462" stroke-width="9" stroke="{PAPER}"/><path d="M240 462C210 330 330 270 390 270" stroke-width="1" stroke-dasharray="4 9"/>'
o+=ground(390,690,210)
# --- coins (x 650-870) stacked + one rolling
def coin(cx,cy,rx=70,ry=22,h=16):
    return (f'<path d="M{cx-rx} {cy}V{cy+h}A{rx} {ry} 0 0 0 {cx+rx} {cy+h}V{cy}" fill="{PAPER}"/>'
            f'<path d="M{cx+rx*0.35} {cy+ry*.93}A{rx} {ry} 0 0 0 {cx+rx} {cy+h}V{cy}Z" fill="url(#h1)" stroke="none"/>'
            +"".join(f'<path d="M{cx-rx+8+i*14} {cy+ry*0.9*math.sqrt(max(0,1-((-rx+8+i*14)/rx)**2))+3:.0f}v{h-6}" stroke-width="1" opacity=".6"/>' for i in range(0,int(2*rx/14)-1) if abs(-rx+8+i*14)<rx*.95)
            +f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{PAPER}"/><ellipse cx="{cx}" cy="{cy}" rx="{rx-10}" ry="{ry-5}" stroke-width="1.2"/><path d="M{cx-14} {cy+2}h28M{cx} {cy-7}v10" stroke-width="1.6"/>')
for k in range(4): o+=coin(760,640-k*20)
o+=coin(760,640-4*20,70,22,16)
o+=f'<ellipse cx="900" cy="650" rx="12" ry="48" transform="rotate(-18 900 650)" fill="{PAPER}"/><ellipse cx="900" cy="650" rx="7" ry="34" transform="rotate(-18 900 650)" stroke-width="1.2"/>'
o+=ground(790,710,160)
# --- balance scale (x 960-1260)
o+=f'<path d="M1110 690H1170L1160 668H1120Z" fill="{PAPER}"/><path d="M1110 690Q1140 705 1170 690" stroke-width="2"/>'
o+=f'<path d="M1133 668V360H1147V668Z" fill="{PAPER}"/>'+shade("M1141 668V360H1147V668Z","h2")
o+=f'<circle cx="1140" cy="352" r="16" fill="{PAPER}"/><circle cx="1140" cy="352" r="5" fill="{INK}"/>'
o+=f'<path d="M980 392L1140 372L1300 392L1300 402L1140 384L980 402Z" fill="{PAPER}"/>'+shade("M1140 384L1300 402V392L1140 372Z","h2")
for x in (990,1290):
    o+=f'<circle cx="{x}" cy="397" r="7" fill="{PAPER}"/>'
    o+=f'<path d="M{x} 404L{x-58} 560M{x} 404L{x+58} 560M{x} 404V560" stroke-width="1.4"/>'
    o+=f'<path d="M{x-66} 560H{x+66}Q{x+50} 600 {x} 604Q{x-50} 600 {x-66} 560Z" fill="{PAPER}"/>'+shade(f"M{x} 560H{x+66}Q{x+50} 600 {x} 604Z","h1")
# weights on pan: apple left, coins right
o+=f'<path d="M990 528C968 515 950 535 953 556L1028 556C1030 535 1012 515 990 528Z" fill="{PAPER}"/><path d="M990 528Q992 516 998 508" stroke-width="2.4"/>'
o+=f'<ellipse cx="1290" cy="545" rx="26" ry="8" fill="{PAPER}"/><ellipse cx="1290" cy="552" rx="26" ry="8" fill="{PAPER}"/>'
o+=ground(1140,712,170)
# ivy
o+=ivy(100,770,[(190,730,270,765),(330,795,420,770)],[(140,752,-70,1),(215,742,-10,.85),(290,772,-100,1),(240,738,50,.7),(385,787,20,.8)])
o+='</svg>'
o=finish(o,700,490)
open(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','plate-6.svg'),'w').write(o)
