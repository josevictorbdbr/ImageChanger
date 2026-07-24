import { FaqItem } from "../components/FaqList";

// FAQ genérica do site, usada na Home e injetada nas páginas de ferramenta
// (Fase 1 da arquitetura mista SEO + AdSense) para equilibrar a densidade de conteúdo.
export const SITE_FAQ: FaqItem[] = [
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
];
