from gen import *
o=head()
# --- cottage: x 260-640, y 330-690
o+=f'<path d="M290 520H610V690H290Z" fill="{PAPER}"/>'
# brick hatching on wall (right shade)
o+=shade("M540 520H610V690H540Z","h1")
for y in range(540,690,24): o+=f'<path d="M290 {y}H610" stroke-width=".8" opacity=".45"/>'
# chimney
o+=f'<path d="M520 440V365H565V500Z" fill="{PAPER}"/>'+shade("M548 365H565V500H548Z","h2")+'<path d="M512 365H573" stroke-width="3"/>'
o+='<path d="M540 345C525 325 560 312 545 290C532 270 560 258 552 240" stroke-width="1.3" opacity=".5"/>'
# roof
o+=f'<path d="M250 525L450 360L650 525Z" fill="{PAPER}"/>'+shade("M450 360L650 525H450Z","h3")
o+='<path d="M250 525L450 360L650 525Z"/>'
# door
o+=f'<path d="M400 690V585Q400 555 428 555Q456 555 456 585V690Z" fill="{PAPER}"/>'+shade("M428 555Q456 555 456 585V690H428Z","h1")
o+='<circle cx="445" cy="630" r="4" fill="%s"/>'%INK+'<path d="M400 585Q428 575 456 585" stroke-width="1"/>'
# window left
o+=f'<rect x="322" y="565" width="56" height="62" fill="{PAPER}"/><path d="M350 565V627M322 596H378" stroke-width="1.6"/>'+shade("M322 565H350V596H322Z","h2")+'<rect x="316" y="627" width="68" height="9" fill="%s"/>'%PAPER
# window right (upstairs)
o+=f'<rect x="525" y="565" width="56" height="62" fill="{PAPER}"/><path d="M553 565V627M525 596H581" stroke-width="1.6"/>'
# attic window
o+=f'<circle cx="450" cy="470" r="22" fill="{PAPER}"/><path d="M450 448V492M428 470H472" stroke-width="1.5"/>'
# ground + path
o+=ground(450,700,260)
o+='<g transform="translate(735 440) scale(.92) translate(-770 -330)">'
o+=f'<circle cx="810" cy="480" r="50" fill="{PAPER}"/><circle cx="810" cy="480" r="24"/>'+crescent(810,480,50,50,-10,-10,"h1","k1")
o+='<circle cx="810" cy="480" r="50"/><circle cx="810" cy="480" r="34" stroke-width="1.2"/>'
o+=f'<path d="M780 465Q810 440 840 465M788 495Q810 520 832 495" stroke-width="1.2"/>'
o+=f'<path d="M858 474H1090V488H858Z" fill="{PAPER}"/>'+shade("M858 482H1090V488H858Z","h2")
o+=f'<path d="M1010 488V535H1038V515H1054V535H1082V488" fill="{PAPER}"/>'+shade("M1010 520H1082V535H1010Z","h2")
o+='<path d="M880 470H990M862 454H900" stroke-width="1" opacity=".6"/>'
o+=f'<rect x="860" y="468" width="14" height="26" fill="{PAPER}"/>'
o+=ground(960,560,170)
o+='</g>'
# --- window
o+='<g transform="translate(1090 395) scale(.9) translate(-1070 -320)">'
o+=f'<rect x="1090" y="320" width="200" height="270" fill="{PAPER}"/><rect x="1105" y="335" width="170" height="240" stroke-width="1.4"/>'
o+=f'<path d="M1190 335V575M1105 455H1275" stroke-width="2.4"/>'+shade("M1105 335H1190V455H1105Z","h2")
# curtains
o+=f'<path d="M1105 335C1125 380 1118 430 1105 470Z" fill="{PAPER}"/><path d="M1275 335C1255 380 1262 430 1275 470Z" fill="{PAPER}"/><path d="M1112 345Q1116 400 1108 450M1268 345Q1264 400 1272 450" stroke-width="1" opacity=".6"/>'
# sill
o+=f'<path d="M1070 590H1310V612H1070Z" fill="{PAPER}"/><path d="M1070 612H1310" stroke-width="3"/>'+shade("M1070 600H1310V612H1070Z","h2")
# flower pot
o+=f'<path d="M1150 590L1160 530H1220L1230 590Z" fill="{PAPER}"/><path d="M1146 534H1234V548H1146Z" fill="{PAPER}"/>'+shade("M1195 534H1234V548H1195ZM1205 548H1220L1230 590H1195Z","h1")
o+='<path d="M1190 530C1186 500 1200 480 1190 455M1190 515C1170 495 1155 495 1150 480M1190 505C1210 490 1225 488 1232 470" stroke-width="2"/>'
for (x,y) in [(1190,448),(1148,474),(1236,462)]:
    for a in range(0,360,72):
        dx=math.cos(math.radians(a))*10; dy=math.sin(math.radians(a))*10
        o+=f'<ellipse cx="{x+dx:.0f}" cy="{y+dy:.0f}" rx="7" ry="5" transform="rotate({a} {x+dx:.0f} {y+dy:.0f})" fill="{PAPER}" stroke-width="1.5"/>'
    o+=f'<circle cx="{x}" cy="{y}" r="4" fill="{INK}"/>'
o+=leaf(1190,520,-30,.6)+leaf(1190,515,200,.55)
o+='</g>'
# ivy
o+=ivy(110,770,[(190,730,270,760),(330,790,420,770)],[(150,752,-70,1),(225,744,-10,.85),(300,770,-100,1),(250,740,50,.7),(380,785,20,.8)])
o+='</svg>'
o=finish(o,700,480)
open(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','plate-5.svg'),'w').write(o)
