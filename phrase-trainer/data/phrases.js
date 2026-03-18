// ─── Business English Phrase Trainer ────────────────────────────────────────
// Office Design Ltd. | Höhere Handelsschule NRW | B1–B2
// ─────────────────────────────────────────────────────────────────────────────

const PHRASES = {

  smalltalk: {
    label: "Small Talk",
    icon: "💬",
    color: "#f59e0b",
    colorLight: "#fffbeb",
    cards: [
      // ── Opening ──
      { id: "st01", de: "Hatten Sie eine gute Anreise?", en: "Did you have a good journey down?", function: "Asking about travel", level: "B1" },
      { id: "st02", de: "Wie war Ihr Flug?", en: "How was your flight?", function: "Asking about travel", level: "B1" },
      { id: "st03", de: "Schönes Wetter heute, nicht wahr?", en: "Lovely day, isn't it?", function: "Weather small talk", level: "B1" },
      { id: "st04", de: "Ist das Ihr erster Besuch in Düsseldorf?", en: "Is this your first visit to Düsseldorf?", function: "Local area", level: "B1" },
      { id: "st05", de: "Haben Sie schon die Altstadt gesehen?", en: "Have you had a chance to see the Altstadt yet?", function: "Local area", level: "B1" },
      // ── Keeping it going ──
      { id: "st06", de: "Ach wirklich? Das klingt toll!", en: "Oh really? That sounds great!", function: "Show interest", level: "B1" },
      { id: "st07", de: "Und wie ist das gelaufen?", en: "And how did that go?", function: "Ask a follow-up", level: "B1" },
      { id: "st08", de: "Ich weiß genau, was Sie meinen.", en: "I know exactly what you mean!", function: "Show empathy", level: "B1" },
      { id: "st09", de: "Das ist interessant. Erzählen Sie mehr.", en: "How interesting! Tell me more.", function: "Show interest", level: "B1" },
      { id: "st10", de: "Wie war Ihr Wochenende?", en: "Did you have a good weekend?", function: "Weekend small talk", level: "B1" },
      // ── Transitioning ──
      { id: "st11", de: "Übrigens, haben Sie schon von ... gehört?", en: "By the way, have you heard about ...?", function: "Change topic", level: "B1" },
      { id: "st12", de: "Na ja, sollen wir hineingehen?", en: "Anyway, shall we head in?", function: "Close small talk", level: "B1" },
      { id: "st13", de: "Es war sehr schön, mit Ihnen zu reden.", en: "Well, it was lovely talking to you.", function: "Close small talk", level: "B1" },
      { id: "st14", de: "Ich will Sie nicht länger aufhalten.", en: "I'd better let you get on.", function: "Close small talk", level: "B1" },
      { id: "st15", de: "Wie läuft das Geschäft momentan?", en: "How's business at the moment?", function: "Light work topic", level: "B1" },
      { id: "st16", de: "Es war ein ziemlich geschäftiges Quartal, oder?", en: "It's been a pretty busy quarter, hasn't it?", function: "Light work topic", level: "B2" },
      { id: "st17", de: "Haben Sie Pläne für die Pause?", en: "Any plans for the break?", function: "Weekend small talk", level: "B1" },
      { id: "st18", de: "Das Wetter hier ist viel besser als in London.", en: "The weather here is much better than in London!", function: "Weather small talk", level: "B1" },
    ]
  },

  telephoning: {
    label: "Telephoning",
    icon: "📞",
    color: "#6366f1",
    colorLight: "#eef2ff",
    cards: [
      // ── Answering ──
      { id: "tel01", de: "Office Design Ltd., guten Morgen. Hier spricht [Name]. Was kann ich für Sie tun?", en: "Office Design Ltd., good morning. This is [name] speaking. How can I help you?", function: "Answering the phone", level: "B1" },
      { id: "tel02", de: "Einen Augenblick, ich verbinde Sie.", en: "Just a moment. I'll put you through.", function: "Transferring a call", level: "B1" },
      { id: "tel03", de: "Bitte bleiben Sie in der Leitung.", en: "Please hold the line.", function: "Transferring a call", level: "B1" },
      // ── Caller ──
      { id: "tel04", de: "Hier ist [Name] von [Firma].", en: "This is [name] from [company].", function: "Identifying yourself", level: "B1" },
      { id: "tel05", de: "Ich würde gerne mit [Name] sprechen, bitte.", en: "I'd like to speak to [name], please.", function: "Stating purpose", level: "B1" },
      { id: "tel06", de: "Ich rufe wegen [Thema] an.", en: "I'm calling about [topic].", function: "Stating purpose", level: "B1" },
      { id: "tel07", de: "Könnten Sie mir sagen, wann die Lieferung erfolgt?", en: "Could you tell me when the delivery will be?", function: "Asking for information", level: "B1" },
      // ── Not available ──
      { id: "tel08", de: "Tut mir leid, Frau Blake ist gerade in einer Besprechung.", en: "I'm afraid Ms Blake is in a meeting right now.", function: "Person not available", level: "B1" },
      { id: "tel09", de: "Er ist heute nicht im Büro.", en: "He's out of the office today.", function: "Person not available", level: "B1" },
      { id: "tel10", de: "Möchten Sie eine Nachricht hinterlassen?", en: "Would you like to leave a message?", function: "Taking a message", level: "B1" },
      { id: "tel11", de: "Können Sie Ihr Name und Ihre Nummer hinterlassen?", en: "Could I take your name and number, please?", function: "Taking a message", level: "B1" },
      { id: "tel12", de: "Ich werde Ihre Nachricht weitergeben.", en: "I'll pass your message on to her.", function: "Taking a message", level: "B1" },
      { id: "tel13", de: "Wir melden uns so bald wie möglich bei Ihnen.", en: "We'll get back to you as soon as possible.", function: "Promising action", level: "B1" },
      // ── Bad line ──
      { id: "tel14", de: "Es tut mir leid, ich habe das nicht verstanden. Die Leitung ist schlecht.", en: "I'm sorry, I didn't catch that. This is a bad line.", function: "Bad connection", level: "B1" },
      { id: "tel15", de: "Könnten Sie das bitte wiederholen?", en: "Could you repeat that, please?", function: "Bad connection", level: "B1" },
      { id: "tel16", de: "Könnten Sie das für mich buchstabieren?", en: "Could you spell that for me, please?", function: "Bad connection", level: "B1" },
      // ── Closing ──
      { id: "tel17", de: "Danke für Ihren Anruf. Auf Wiederhören.", en: "Thanks for calling. Goodbye.", function: "Closing the call", level: "B1" },
      { id: "tel18", de: "Kann ich sonst noch etwas für Sie tun?", en: "Is there anything else I can do for you?", function: "Closing the call", level: "B1" },
    ]
  },

  emails: {
    label: "Business Emails",
    icon: "✉️",
    color: "#0891b2",
    colorLight: "#ecfeff",
    cards: [
      // ── Opening ──
      { id: "em01", de: "Ich schreibe Ihnen bezüglich ...", en: "I am writing to enquire about / with regard to ...", function: "Email opening", level: "B1" },
      { id: "em02", de: "Vielen Dank für Ihre E-Mail vom [Datum].", en: "Thank you for your email of [date].", function: "Email opening", level: "B1" },
      { id: "em03", de: "Mit Bezug auf unser Telefongespräch vom ...", en: "With reference to our telephone conversation of ...", function: "Email opening", level: "B2" },
      { id: "em04", de: "Ich freue mich, Ihnen mitteilen zu können, dass ...", en: "I am pleased to inform you that ...", function: "Good news opening", level: "B1" },
      { id: "em05", de: "Es tut mir leid, Ihnen mitteilen zu müssen, dass ...", en: "I regret to inform you that ...", function: "Bad news opening", level: "B2" },
      // ── Body ──
      { id: "em06", de: "Im Anhang finden Sie ...", en: "Please find attached ...", function: "Referencing attachments", level: "B1" },
      { id: "em07", de: "Ich würde mich freuen, wenn Sie ...", en: "I would be grateful if you could ...", function: "Making a request", level: "B1" },
      { id: "em08", de: "Könnten Sie mir bitte ... zukommen lassen?", en: "Could you please send me ...?", function: "Making a request", level: "B1" },
      { id: "em09", de: "Sollten Sie Fragen haben, zögern Sie bitte nicht, mich zu kontaktieren.", en: "Should you have any queries, please do not hesitate to contact me.", function: "Offering help", level: "B1" },
      { id: "em10", de: "Ich bestätige hiermit den Empfang von ...", en: "I am writing to confirm receipt of ...", function: "Confirming", level: "B2" },
      { id: "em11", de: "Wir möchten Sie daran erinnern, dass ...", en: "We would like to remind you that ...", function: "Reminding", level: "B2" },
      { id: "em12", de: "Bitte beachten Sie, dass ...", en: "Please note that ...", function: "Drawing attention", level: "B1" },
      // ── Closing ──
      { id: "em13", de: "Ich freue mich auf Ihre baldige Antwort.", en: "I look forward to hearing from you soon.", function: "Email closing", level: "B1" },
      { id: "em14", de: "Ich freue mich auf eine weitere Zusammenarbeit.", en: "I look forward to working with you.", function: "Email closing", level: "B1" },
      { id: "em15", de: "Mit freundlichen Grüßen (an bekannte Person)", en: "Yours sincerely,", function: "Complimentary close", level: "B1" },
      { id: "em16", de: "Mit freundlichen Grüßen (an unbekannte Person)", en: "Yours faithfully,", function: "Complimentary close", level: "B1" },
      { id: "em17", de: "Mit besten Grüßen (halbformell)", en: "Best regards, / Kind regards,", function: "Complimentary close", level: "B1" },
      { id: "em18", de: "Für Rückfragen stehe ich gerne zur Verfügung.", en: "Please feel free to contact me if you need any further information.", function: "Offering help", level: "B2" },
    ]
  },

  complaints: {
    label: "Complaints",
    icon: "⚠️",
    color: "#dc2626",
    colorLight: "#fef2f2",
    cards: [
      // ── Making a complaint ──
      { id: "co01", de: "Leider muss ich mich über ... beschweren.", en: "I am writing to complain about ...", function: "Opening a complaint", level: "B1" },
      { id: "co02", de: "Ich möchte Sie auf ein Problem aufmerksam machen.", en: "I would like to draw your attention to a problem.", function: "Opening a complaint", level: "B2" },
      { id: "co03", de: "Ich bin sehr enttäuscht über ...", en: "I am very disappointed with ...", function: "Expressing dissatisfaction", level: "B1" },
      { id: "co04", de: "Leider entspricht die Lieferung nicht unserer Bestellung.", en: "Unfortunately, the delivery does not match our order.", function: "Stating the problem", level: "B1" },
      { id: "co05", de: "Die Ware ist beschädigt angekommen.", en: "The goods arrived damaged.", function: "Stating the problem", level: "B1" },
      { id: "co06", de: "Die Lieferung hatte eine Verspätung von [x] Tagen.", en: "The delivery was [x] days late.", function: "Stating the problem", level: "B1" },
      { id: "co07", de: "Ich erwarte eine umgehende Lösung.", en: "I expect a prompt resolution to this matter.", function: "Demanding action", level: "B2" },
      { id: "co08", de: "Ich bitte um Ersatzlieferung bis spätestens [Datum].", en: "I would request a replacement by [date] at the latest.", function: "Requesting action", level: "B1" },
      // ── Responding to a complaint ──
      { id: "co09", de: "Vielen Dank, dass Sie uns auf dieses Problem aufmerksam gemacht haben.", en: "Thank you for bringing this matter to our attention.", function: "Acknowledging complaint", level: "B1" },
      { id: "co10", de: "Wir entschuldigen uns aufrichtig für die entstandenen Unannehmlichkeiten.", en: "We sincerely apologise for any inconvenience caused.", function: "Apologising", level: "B1" },
      { id: "co11", de: "Wir haben die Angelegenheit untersucht und ...", en: "We have investigated the matter and ...", function: "Explaining", level: "B2" },
      { id: "co12", de: "Wir werden das Problem umgehend beheben.", en: "We will rectify the problem without delay.", function: "Promising action", level: "B1" },
      { id: "co13", de: "Als Entschädigung bieten wir Ihnen ... an.", en: "As compensation, we would like to offer you ...", function: "Offering compensation", level: "B2" },
      { id: "co14", de: "Wir versichern Ihnen, dass sich dies nicht wiederholen wird.", en: "We can assure you that this will not happen again.", function: "Reassuring", level: "B2" },
      { id: "co15", de: "Bitte senden Sie die beschädigte Ware an uns zurück.", en: "Please return the damaged goods to us.", function: "Requesting return", level: "B1" },
      { id: "co16", de: "Wir haben sofortige Maßnahmen eingeleitet.", en: "We have taken immediate steps to address this.", function: "Promising action", level: "B2" },
    ]
  },

  mediation: {
    label: "Mediation",
    icon: "🔀",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
    cards: [
      // ── Key mediation phrases ──
      { id: "me01", de: "Laut dem Bericht ...", en: "According to the report, ...", function: "Introducing information", level: "B1" },
      { id: "me02", de: "Der Text besagt, dass ...", en: "The text states that ...", function: "Introducing information", level: "B1" },
      { id: "me03", de: "Mit anderen Worten ...", en: "In other words, ...", function: "Paraphrasing", level: "B1" },
      { id: "me04", de: "Das bedeutet, dass ...", en: "This means that ...", function: "Explaining", level: "B1" },
      { id: "me05", de: "Zusammenfassend lässt sich sagen, dass ...", en: "In summary, ...", function: "Summarising", level: "B1" },
      { id: "me06", de: "Der Autor argumentiert, dass ...", en: "The author argues that ...", function: "Citing source", level: "B2" },
      { id: "me07", de: "Dem Bericht zufolge beläuft sich der Betrag auf ...", en: "According to the report, the amount comes to ...", function: "Giving figures", level: "B2" },
      { id: "me08", de: "Auf der einen Seite ... auf der anderen Seite ...", en: "On the one hand ... on the other hand ...", function: "Contrasting", level: "B2" },
      { id: "me09", de: "Darüber hinaus ...", en: "Furthermore, / In addition, ...", function: "Adding information", level: "B1" },
      { id: "me10", de: "Dies ist besonders wichtig, weil ...", en: "This is particularly important because ...", function: "Emphasising", level: "B2" },
      { id: "me11", de: "Es wird empfohlen, dass ...", en: "It is recommended that ...", function: "Conveying recommendations", level: "B2" },
      { id: "me12", de: "Der Hauptpunkt ist, dass ...", en: "The main point is that ...", function: "Highlighting key info", level: "B1" },
      { id: "me13", de: "Ich würde das so zusammenfassen: ...", en: "I would summarise this as follows: ...", function: "Summarising", level: "B1" },
      { id: "me14", de: "Was den Preis betrifft, ...", en: "As regards the price, ...", function: "Introducing a topic", level: "B1" },
      { id: "me15", de: "Kurz gesagt ...", en: "In brief, / To put it briefly, ...", function: "Summarising", level: "B1" },
      { id: "me16", de: "Aus diesem Grund ...", en: "For this reason, / Therefore, ...", function: "Giving reasons", level: "B1" },
    ]
  }

};

// ── Spaced Repetition: SM-2 simplified ───────────────────────────────────────
// Each card stores: { interval, ease, due, reps }
// Rating: 0=Again, 1=Hard, 2=Good, 3=Easy

function nextReview(card, rating) {
  const now = Date.now();
  let { interval = 1, ease = 2.5, reps = 0 } = card;

  if (rating === 0) {
    interval = 1;
    reps = 0;
  } else if (rating === 1) {
    interval = Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
    reps++;
  } else if (rating === 2) {
    interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * ease);
    reps++;
  } else {
    interval = reps === 0 ? 1 : reps === 1 ? 4 : Math.round(interval * ease * 1.3);
    ease = ease + 0.1;
    reps++;
  }

  return {
    interval,
    ease: Math.round(ease * 100) / 100,
    reps,
    due: now + interval * 24 * 60 * 60 * 1000
  };
}
