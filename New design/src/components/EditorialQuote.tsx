"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  { text: "\"I've always thought <br/> of *accessories* as the <br/> exclamation ^point^ <br/> of a *woman's* outfit.\"", author: "Diane von Furstenberg" },
  { text: "\"Jewelry has the <br/> power to be this <br/> *one little thing* <br/> that makes you feel ^unique^.\"", author: "Jennie Kwon" },
  { text: "\"Elegance is <br/> not about being *noticed*, <br/> it's about being <br/> ^remembered^.\"", author: "Giorgio Armani" },
  { text: "\"Style is a way <br/> to say *who you are* <br/> without having <br/> to ^speak^.\"", author: "Rachel Zoe" },
  { text: "\"A girl should be <br/> two things: <br/> *classy* and <br/> ^fabulous^.\"", author: "Coco Chanel" },
  { text: "\"Jewelry takes <br/> people's minds off <br/> your *wrinkles* <br/> and ^flaws^.\"", author: "Sonja Henie" },
  { text: "\"Simplicity is the <br/> *ultimate* <br/> form of <br/> ^sophistication^.\"", author: "Leonardo da Vinci" },
  { text: "\"Fashion changes, <br/> but *style* <br/> eternally <br/> ^endures^.\"", author: "Coco Chanel" },
  { text: "\"You can never take <br/> too much care <br/> over the choice of <br/> your *shoes*.\"", author: "Christian Dior" },
  { text: "\"Life is a party, <br/> dress *like it* <br/> and dance <br/> till ^dawn^.\"", author: "Audrey Hepburn" },
  { text: "\"I make clothes, <br/> but *women* <br/> are the ones who make <br/> ^fashion^.\"", author: "Azzedine Alaia" },
  { text: "\"In order to be <br/> *irreplaceable* <br/> one must always be <br/> ^different^.\"", author: "Coco Chanel" },
  { text: "\"Clothes mean nothing <br/> until someone <br/> *lives* <br/> freely ^in them^.\"", author: "Marc Jacobs" },
  { text: "\"Fashion is the <br/> *armor* to survive <br/> the reality of <br/> ^everyday^ life.\"", author: "Bill Cunningham" },
  { text: "\"What you wear <br/> is how you <br/> present yourself to <br/> the *world*.\"", author: "Miuccia Prada" },
  { text: "\"Every day is <br/> a fashion show <br/> and the *world* is <br/> the ^runway^.\"", author: "Marc Jacobs" },
  { text: "\"Dressing is a <br/> way of *life* <br/>, a form of <br/> ^art^.\"", author: "Yves Saint Laurent" },
  { text: "\"I don't design clothes. <br/> I design <br/> beautiful <br/> *dreams*.\"", author: "Ralph Lauren" },
  { text: "\"Fashion is like <br/> *eating*, you shouldn't <br/> stick to the <br/> same ^menu^.\"", author: "Kenzo Takada" },
  { text: "\"True elegance for me <br/> is the manifestation <br/> of an *independent* <br/> ^mind^.\"", author: "Isabella Rossellini" },
];

function parseQuote(text: string) {
  const html = text
    .replace(/\*([^*]+)\*/g, '<span style="color: var(--red); font-style: italic;">$1</span>')
    .replace(/\^([^^]+)\^/g, '<span style="font-family: var(--f-body); font-weight: 300; font-size: 0.8em; letter-spacing: 0; display: inline-block; transform: translateY(-8px);">$1</span>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function EditorialQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000); // Transitions every 4 seconds as requested
    return () => clearInterval(timer);
  }, []);

  const current = QUOTES[index];

  return (
    <section style={{
      padding: "160px 40px",
      background: "var(--white)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTop: "1px solid rgba(0,0,0,0.05)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      minHeight: "700px" // Prevents layout shift since we format consistently with 4 lines
    }}>
      <div style={{ maxWidth: "1200px", textAlign: "center", position: "relative", width: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
          >
            <h2 style={{
              fontFamily: "var(--f-display)",
              fontSize: "clamp(2.5rem, 5vw, 6rem)",
              lineHeight: "1.05",
              color: "var(--black)",
              margin: 0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase"
            }}>
              {parseQuote(current.text)}
            </h2>
            
            <div style={{
              marginTop: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px"
            }}>
              <div style={{ width: "40px", height: "1px", background: "var(--black)", opacity: 0.3 }} />
              <p style={{
                fontFamily: "var(--f-body)",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--black)",
                margin: 0
              }}>
                {current.author}
              </p>
              <div style={{ width: "40px", height: "1px", background: "var(--black)", opacity: 0.3 }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
