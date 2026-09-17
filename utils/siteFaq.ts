import { FaqItem } from "../components/FaqList";

// FAQ genérica do site
export const SITE_FAQ: Record<"pt-BR" | "en", FaqItem[]> = {
  "pt-BR": [
    {
      question: "O Image Changer é totalmente gratuito?",
      answer:
        "Sim. Todas as ferramentas de conversão e edição são gratuitas, sem limite de uso e sem necessidade de assinatura.",
    },
    {
      question: "Minhas imagens são enviadas ou salvas em algum servidor?",
      answer:
        "Não. Todo o processamento acontece localmente no seu navegador, usando Canvas e APIs nativas. Nenhum arquivo é enviado ou armazenado em servidores.",
    },
    {
      question: "Preciso criar uma conta para usar?",
      answer: "Não é necessário cadastro nem login. Basta acessar a ferramenta desejada e começar a usar imediatamente.",
    },
    {
      question: "Posso converter várias imagens simultaneamente?",
      answer:
        "Sim, é possível enviar até 5 imagens de uma vez. Cada imagem é processada e disponibilizada para download individualmente.",
    },
    {
      question: "Quais formatos de imagem são suportados?",
      answer:
        "Atualmente o Image Changer converte entre PNG, JPG e WebP. Novos formatos, como AVIF e HEIC, estão previstos para versões futuras.",
    },
  ],
  en: [
    {
      question: "Is Image Changer completely free?",
      answer: "Yes. All conversion and editing tools are free, with no usage limits and no subscription required.",
    },
    {
      question: "Are my images uploaded or saved to any server?",
      answer:
        "No. All processing happens locally in your browser, using Canvas and native APIs. No file is ever uploaded or stored on servers.",
    },
    {
      question: "Do I need to create an account to use it?",
      answer: "No registration or login is required. Just open the tool you need and start using it right away.",
    },
    {
      question: "Can I convert several images at once?",
      answer:
        "Yes, you can upload up to 5 images at a time. Each image is processed and made available for download individually.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "Image Changer currently converts between PNG, JPG, and WebP. New formats, like AVIF and HEIC, are planned for future versions.",
    },
  ],
};
