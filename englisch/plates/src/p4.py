from gen import *
o=head()
# --- teapot
o+=f'<ellipse cx="470" cy="540" rx="150" ry="125" fill="{PAPER}"/>'
o+=crescent(470,540,150,125,-22,-8,"h1","cb")
o+='<ellipse cx="470" cy="540" rx="150" ry="125"/>'
# bands & flowers
o+='<path d="M330 505Q470 540 610 505M322 560Q470 600 618 560" stroke-width="1.4"/>'
for i,x in enumerate(range(365,590,45)):
    y=528+ (20*math.sin((x-330)/280*math.pi))
    o+=f'<circle cx="{x}" cy="{y:.0f}" r="7" stroke-width="1.4"/><circle cx="{x}" cy="{y:.0f}" r="2" fill="{INK}"/>'
    o+=f'<path d="M{x-8} {y+10:.0f}q-8 6-14 2M{x+8} {y+10:.0f}q8 6 14 2" stroke-width="1.2"/>'
# foot
o+=f'<path d="M395 645Q470 668 545 645L538 672Q470 690 402 672Z" fill="{PAPER}"/>'+shade("M470 660Q520 655 538 672Q470 690 470 660Z","h2")
# lid
o+=f'<path d="M365 430Q470 385 575 430Q470 455 365 430Z" fill="{PAPER}"/><path d="M395 410Q470 360 545 410" stroke-width="2.2"/>'
o+=f'<path d="M400 408Q470 355 540 408Q470 425 400 408Z" fill="{PAPER}"/>'+shade("M480 392Q530 395 540 408Q500 422 480 415Z","h2")
o+=f'<circle cx="470" cy="352" r="17" fill="{PAPER}"/><path d="M462 346q8-6 14 2" stroke-width="1.2"/>'
o+='<path d="M470 369v10"/>'
# spout
o+=f'<path d="M608 505C660 500 690 455 716 400L736 408C715 480 680 545 616 585Z" fill="{PAPER}"/>'
o+=shade("M650 520C685 490 705 450 722 410L736 408C715 480 680 545 616 585Z","h1")
o+='<path d="M716 400Q726 392 736 408" stroke-width="2.4"/>'
# handle
o+=f'<path d="M330 485C250 470 215 545 252 600C275 635 320 635 340 625" stroke-width="12" stroke="{INK}"/><path d="M330 485C250 470 215 545 252 600C275 635 320 635 340 625" stroke-width="7" stroke="{PAPER}"/>'
o+='<path d="M305 478C245 470 218 540 250 590" stroke-width="1.2"/>'
# steam
for dx in (0,): o+='<path d="M722 360C700 330 745 310 722 280C700 252 740 236 726 210" stroke-width="1.4" opacity=".5"/><path d="M742 372C720 342 765 322 742 292" stroke-width="1" opacity=".4"/>'
o+=ground(470,690,190)
# --- bread
o+=f'<path d="M780 668C762 598 826 548 918 548C1010 548 1080 590 1058 664C1050 698 800 702 780 668Z" fill="{PAPER}"/>'
o+=shade("M800 685C960 706 1040 692 1058 664C1070 628 1050 595 1030 585C1040 640 990 690 800 685Z","h1")
o+='<path d="M780 668C762 598 826 548 918 548C1010 548 1080 590 1058 664C1050 698 800 702 780 668Z"/>'
for (a,b,c,d) in [(840,596,872,634),(900,578,936,622),(962,578,998,620)]:
    o+=f'<path d="M{a} {b}Q{(a+c)//2+8} {(b+d)//2-10} {c} {d}" stroke-width="2.6"/><path d="M{a+6} {b+4}Q{(a+c)//2+14} {(b+d)//2-4} {c+4} {d-3}" stroke-width="1.2"/>'
o+='<path d="M800 640Q930 668 1040 640" stroke-width="1" opacity=".6"/>'
o+=ground(925,712,150)
# --- apple
o+=f'<path d="M1160 560C1120 540 1090 575 1096 625C1102 675 1140 710 1165 700C1190 710 1228 675 1232 625C1236 575 1205 540 1160 560Z" fill="{PAPER}"/>'
o+=crescent(1163,625,70,78,-24,-10,"h1","ca")
o+='<path d="M1160 560C1120 540 1090 575 1096 625C1102 675 1140 710 1165 700C1190 710 1228 675 1232 625C1236 575 1205 540 1160 560Z"/>'
o+='<path d="M1160 560Q1162 545 1170 532" stroke-width="3.2"/>'
o+=f'<path d="M1172 538C1195 515 1225 520 1232 530C1215 548 1190 548 1172 538Z" fill="{PAPER}"/><path d="M1176 538Q1205 530 1228 530" stroke-width="1.2"/>'
o+='<path d="M1114 600Q1112 625 1122 648" stroke-width="2.2" opacity=".7"/>'
o+=ground(1163,712,85)
# --- ivy
o+=ivy(120,760,[(210,700,300,730),(380,760,470,730)],[(155,742,-70,1.0),(220,720,-20,.9),(300,732,-100,1.0),(240,708,40,.7),(360,748,10,.85),(430,745,-60,.7),(190,752,150,.75)])
o+='</svg>'
o=finish(o,685,495)
open(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','plate-4.svg'),'w').write(o)
