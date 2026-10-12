from lib import *
# 1 PBP Bewerbung
b=win(40,50,200,230)+f'<rect x="60" y="100" width="110" height="14" fill="{INK}" stroke="none"/>'+lines(60,136,[160,140,150])+f'<rect x="60" y="196" width="88" height="26" fill="{SOFT}"/>'+lines(60,246,[100])+f'<circle cx="140" cy="50" r="11" fill="{MINT}"/>'
b+=box(350,100,170,200)+f'<circle cx="396" cy="150" r="21" fill="{SOFT}"/><path d="M379 198c2-15 9-22 17-22s15 7 17 22Z" fill="{SOFT}"/>'+lines(434,138,[62,50,62])+lines(372,236,[128,108,120])+badge(500,288,28)
b+=f'<path d="M210 210l62 62" stroke-width="22"/><path d="M210 210l62 62" stroke-width="14"/><circle cx="188" cy="190" r="56" fill="{PAPER}" fill-opacity=".92" stroke-width="7"/><circle cx="188" cy="190" r="44" fill="{SOFT}" fill-opacity=".7" stroke-width="3"/><path d="M168 176c6-11 17-16 28-13" stroke="{PAPER}" stroke-width="6"/>'
b+=bubble(360,24,150,66,PINK,"left")+f'<path d="M414 50c0-12 9-19 19-19s19 7 19 17c0 15-19 14-19 27" stroke-width="6"/><circle cx="433" cy="76" r="4" fill="{INK}"/>'
save("pbp-bewerbung",b)
# 2 PBP Personalbedarf: Ist, Abgang/Zugang, Fehlende (gestrichelt)
b=win(30,40,330,170,PINK)
for i in range(5):
    b+=person(78+i*58,110,.9,SOFT if i<3 else SOFT,dash=(i>=3))
b+=lines(52,196,[120],sw=5)
b+=badge(412,86,28,"minus")+badge(412,158,28,"plus",MINT)
b+=box(450,50,120,180)+f'<rect x="466" y="66" width="88" height="34" fill="{INK}" stroke="none"/><path d="M542 90h-8" stroke="{MINT}" stroke-width="4"/>'
for r in range(3):
    for c in range(3): b+=f'<rect x="{468+c*30}" y="{116+r*34}" width="24" height="24" fill="{PINK if (r,c)==(2,2) else SOFT}" stroke-width="3"/>'
b+=bubble(60,236,190,56,SOFT,"left")+f'<path d="M84 262h60M84 276h100" stroke="{GRAY}" stroke-width="5"/>'
save("pbp",b)
# 3 INWI Geschäftsbrief: A4 mit Zonen
b=box(190,20,220,300)+f'<rect x="190" y="20" width="220" height="30" fill="{PINK}" stroke-width="4"/>'
b+=f'<rect x="210" y="66" width="90" height="46" fill="{SOFT}"/><path d="M222 82h66M222 96h46" stroke="{GRAY}" stroke-width="5"/>'
b+=f'<rect x="338" y="66" width="52" height="24" fill="{INK}" stroke="none"/>'+lines(210,134,[170,150],18)+f'<rect x="210" y="176" width="130" height="14" fill="{INK}" stroke="none"/>'+lines(210,210,[170,160,170,120],20)+lines(210,298,[70],sw=5)
for y in (66,134,176,210): b+=badge(180,y+12,12,"none")
b+=f'<g stroke-width="3"><path d="M104 50v260M96 50h16M96 110h10M96 170h16M96 230h10M96 290h16"/></g>'
b+=bubble(430,60,140,64,PINK,"left")+f'<path d="M450 92h48M450 106h30" stroke="{PAPER}" stroke-width="5"/>'+badge(520,260,30)+f'<path d="M70 200l34 24 46-40" stroke="{INK}" stroke-width="0"/>'
save("inwi-geschaeftsbrief",b)
# 4 GPU Preiskalkulation: Preisschild, Münzen, Rechner, Prozent
b=box(40,40,150,240)+f'<rect x="40" y="40" width="150" height="30" fill="{PINK}"/>'+f'<rect x="58" y="86" width="114" height="46" fill="{INK}" stroke="none"/><path d="M146 116h-16" stroke="{MINT}" stroke-width="5"/>'
for r in range(3):
    for c in range(3): b+=f'<rect x="{58+c*40}" y="{148+r*38}" width="30" height="28" fill="{PINK if (r,c)==(2,2) else SOFT}" stroke-width="3"/>'
b+=f'<path d="M286 70l58-30h86v86l-58 58-86-56Z" fill="{INK}" stroke="none" transform="translate(8 8)"/><path d="M286 70l58-30h86v86l-58 58-86-56Z" fill="{SOFT}"/><circle cx="398" cy="76" r="10" fill="{PAPER}"/>'
b+=f'<circle cx="348" cy="100" r="9" fill="{PINK}" stroke-width="3"/><circle cx="388" cy="144" r="9" fill="{PINK}" stroke-width="3"/><path d="M394 100l-52 44" stroke-width="5"/>'
b+=coin(280,250,30)+coin(346,262,30,PINK)+coin(412,250,30)+badge(500,100,30,"plus",MINT)+badge(500,190,30,"minus")
b+=f'<path d="M232 120C220 150 250 156 262 190" stroke-width="3" stroke-dasharray="6 7"/>'
save("gpu-preiskalkulation",b)
# 5 VW Magisches Sechseck
import math
cx,cy,R=300,170,120
pts=[(cx+R*math.sin(math.radians(60*i)),cy-R*math.cos(math.radians(60*i))) for i in range(6)]
poly=" ".join(f"{x:.0f},{y:.0f}" for x,y in pts)
b=f'<polygon points="{poly}" fill="{INK}" stroke="none" transform="translate(8 8)"/><polygon points="{poly}" fill="{SOFT}"/>'
b+=f'<polygon points="{" ".join(f"{cx+R*.5*math.sin(math.radians(60*i)):.0f},{cy-R*.5*math.cos(math.radians(60*i)):.0f}" for i in range(6))}" fill="{PAPER}" stroke-width="3"/>'
for i,(x,y) in enumerate(pts):
    b+=f'<path d="M{cx} {cy}L{x:.0f} {y:.0f}" stroke-width="3" stroke-dasharray="6 7"/>'
cols=[PINK,MINT,PAPER,PINK,MINT,PAPER]
for (x,y),c in zip(pts,cols): b+=f'<circle cx="{x+5:.0f}" cy="{y+5:.0f}" r="22" fill="{INK}" stroke="none"/><circle cx="{x:.0f}" cy="{y:.0f}" r="22" fill="{c}"/>'
b+=f'<circle cx="{cx}" cy="{cy}" r="18" fill="{PINK}"/>'
b+=badge(80,70,24,"check",MINT)+badge(520,280,24,"plus")+bubble(470,30,100,50,PINK,"left")+f'<path d="M490 55h56" stroke="{PAPER}" stroke-width="5"/>'
save("vw-magisches-sechseck",b)
# 6 Englisch Förderkurs: Buch + Sprechblasen
b=box(110,110,380,170)+f'<path d="M300 110v170" stroke-width="4"/>'+lines(136,142,[130,110,120,90],24)+lines(326,142,[130,100,120,110],24)+f'<rect x="136" y="236" width="60" height="22" fill="{SOFT}"/><rect x="326" y="236" width="40" height="22" fill="{PINK}"/>'
b+=bubble(60,20,170,66,PINK,"left")+f'<circle cx="110" cy="53" r="6" fill="{INK}"/><circle cx="140" cy="53" r="6" fill="{INK}"/><circle cx="170" cy="53" r="6" fill="{INK}"/>'
b+=bubble(370,20,170,66,SOFT,"right")+lines(394,44,[110,80],20,INK,5)
b+=f'<circle cx="300" cy="300" r="0"/>'+badge(520,250,28,"check",MINT)
save("englisch-foerderkurs",b)
# 7 Englisch Telephoning: Handy + Headset + Wellen
b=box(210,30,150,280,PAPER)+f'<rect x="210" y="30" width="150" height="30" fill="{PINK}"/>'+f'<circle cx="285" cy="132" r="30" fill="{SOFT}"/><path d="M250 232c3-30 18-42 35-42s32 12 35 42Z" fill="{SOFT}"/>'+badge(285,278,22,"minus",PINK)+f'<rect x="242" y="80" width="86" height="12" fill="{INK}" stroke="none"/>'
b+=f'<path d="M110 120c-30 30-30 70 0 100M70 90c-52 50-52 130 0 180" stroke-width="5"/>'
b+=f'<path d="M444 120c30 30 30 70 0 100M486 90c52 50 52 130 0 180" stroke-width="5"/>'
b+=bubble(420,20,140,56,MINT,"right")+f'<path d="M444 48h92" stroke="{INK}" stroke-width="5"/>'
b+=f'<path d="M64 300Q70 236 150 250" stroke="{INK}" stroke-width="30"/><path d="M64 300Q70 236 150 250" stroke="{PINK}" stroke-width="18"/><circle cx="64" cy="300" r="20" fill="{PINK}"/><circle cx="154" cy="250" r="20" fill="{PINK}"/>'
save("englisch-telephoning",b)
