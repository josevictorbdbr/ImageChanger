import LegalLayout from "../components/LegalLayout";
import { useLocale } from "../utils/i18n";

export default function TermosDeUso() {
  const locale = useLocale();

  if (locale === "en") {
    return (
      <LegalLayout
        title="Terms of Use"
        path="/termos-de-uso"
        updatedAt="08/07/2026"
        description="Terms of use for Image Changer: a free, browser-based image conversion and editing tool."
      >
        <p>
          By using Image Changer, you agree to the terms described below. If you don't agree, please don't use the
          site.
        </p>

        <h2>What is Image Changer</h2>
        <p>
          Image Changer is a free tool for basic image conversion and editing (PNG, JPG, and WebP) that works
          entirely in your browser, with no registration required.
        </p>

        <h2>Permitted use</h2>
        <p>
          You may use the site to convert and edit images you own or have the right to use. It is prohibited to use
          Image Changer to process illegal or offensive content, or content that violates third-party rights.
        </p>

        <h2>Ownership of images</h2>
        <p>
          All processed images belong to you. Since processing happens locally in your browser, we never have
          access to, copies of, or control over these files.
        </p>

        <h2>Service availability</h2>
        <p>
          Image Changer is offered free of charge, "as is," with no guarantees of continuous availability,
          error-free operation, or fitness for a particular purpose. The service may go offline or change at any
          time, without prior notice.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          We are not liable for any losses or damages arising from the use or inability to use the site, including
          any loss of images during processing.
        </p>

        <h2>Site intellectual property</h2>
        <p>
          The code, design, brand, and content of Image Changer belong to its owner and may not be copied or
          redistributed without authorization.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          These terms may be updated periodically. Continued use of the site after an update constitutes acceptance
          of the new terms.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the Federative Republic of Brazil.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Termos de Uso" path="/termos-de-uso" updatedAt="08/07/2026">
      <p>
        Ao usar o Image Changer, você concorda com os termos descritos abaixo. Se não concordar, pedimos que não
        utilize o site.
      </p>

      <h2>O que é o Image Changer</h2>
      <p>
        O Image Changer é uma ferramenta gratuita de conversão e edição básica de imagens (PNG, JPG e WebP), que
        funciona inteiramente no navegador, sem necessidade de cadastro.
      </p>

      <h2>Uso permitido</h2>
      <p>
        Você pode usar o site para converter e editar imagens de sua titularidade ou às quais tenha direito de uso.
        É proibido utilizar o Image Changer para processar conteúdo ilegal, ofensivo ou que viole direitos de
        terceiros.
      </p>

      <h2>Propriedade das imagens</h2>
      <p>
        Todas as imagens processadas pertencem a você. Como o processamento acontece localmente no seu navegador,
        nunca temos acesso, cópia ou controle sobre esses arquivos.
      </p>

      <h2>Disponibilidade do serviço</h2>
      <p>
        O Image Changer é oferecido gratuitamente, "como está", sem garantias de disponibilidade contínua,
        ausência de erros ou adequação a uma finalidade específica. O serviço pode sair do ar ou ser alterado a
        qualquer momento, sem aviso prévio.
      </p>

      <h2>Limitação de responsabilidade</h2>
      <p>
        Não nos responsabilizamos por perdas, danos ou prejuízos decorrentes do uso ou da impossibilidade de uso do
        site, incluindo eventual perda de imagens durante o processamento.
      </p>

      <h2>Propriedade intelectual do site</h2>
      <p>
        O código, design, marca e conteúdo do Image Changer pertencem ao seu responsável e não podem ser copiados
        ou redistribuídos sem autorização.
      </p>

      <h2>Alterações nestes termos</h2>
      <p>
        Estes termos podem ser atualizados periodicamente. O uso contínuo do site após uma atualização representa
        aceitação dos novos termos.
      </p>

      <h2>Legislação aplicável</h2>
      <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre estes termos podem ser enviadas para <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
