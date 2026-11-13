import WhatsappIcon from "./WhatsappIcon";
import { WA_LINK } from "../lib/site";

export default function WhatsappFlutuante() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-dourado text-noite shadow-lg transition hover:scale-105"
    >
      <WhatsappIcon size={28} />
    </a>
  );
}
