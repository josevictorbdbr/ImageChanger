import Link from "next/link";
import LegalLayout from "../components/LegalLayout";
import { useLocale } from "../utils/i18n";

export default function Privacidade() {
  const locale = useLocale();

  if (locale === "en") {
    return (
      <LegalLayout
        title="Privacy Policy"
        path="/privacidade"
        updatedAt="08/07/2026"
        description="Learn how Image Changer handles information: all image processing happens locally in your browser, with no uploads to any server."
      >
        <p>
          This Privacy Policy explains how Image Changer handles information throughout your use of the site. Image
          Changer is maintained independently by José Victor (an individual), who can be reached at{" "}
          <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
        </p>

        <h2>Image processing</h2>
        <p>
          Images you submit for conversion or editing are processed entirely in your browser, using the Canvas API.
          They are never sent to, stored, or viewed by us at any point. When you close or refresh the page, the
          image is discarded.
        </p>

        <h2>Data we collect</h2>
        <p>Image Changer doesn't require registration, login, or any personal information to use. Even so:</p>
        <ul>
          <li>
            Our hosting provider may automatically collect technical access data (such as IP address, browser type,
            and pages visited) for security and service operation purposes.
          </li>
          <li>
            Cookies and similar technologies may be used by Google AdSense to display ads (see the section below and
            our <Link href="/cookies">Cookie Policy</Link>).
          </li>
        </ul>

        <h2>Your rights (LGPD)</h2>
        <p>
          Since we don't collect personal data beyond what's described above, there's little to access, correct, or
          delete. Still, if you have any questions or requests related to your data, contact us at{" "}
          <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
        </p>

        <h2>Children and teenagers</h2>
        <p>Image Changer is not directed at anyone under 18 and does not intentionally collect data from minors.</p>

        <h2>Changes to this policy</h2>
        <p>This policy may be updated periodically. The date at the top of this page indicates the most recent version.</p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Política de Privacidade" path="/privacidade" updatedAt="08/07/2026">
      <p>
        Esta Política de Privacidade explica como o Image Changer trata informações ao longo do uso do site.
        O Image Changer é mantido de forma independente, por José Victor (pessoa física), e pode ser contatado pelo
        e-mail <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
      </p>

      <h2>Processamento das imagens</h2>
      <p>
        As imagens que você envia para conversão ou edição são processadas inteiramente no seu navegador, usando
        Canvas API. Elas não são enviadas, armazenadas ou visualizadas por nós em nenhum momento. Quando você fecha
        ou atualiza a página, a imagem é descartada.
      </p>

      <h2>Dados que coletamos</h2>
      <p>O Image Changer não exige cadastro, login ou qualquer informação pessoal para ser usado. Ainda assim:</p>
      <ul>
        <li>
          Nosso provedor de hospedagem pode coletar automaticamente dados técnicos de acesso (como endereço IP,
          tipo de navegador e páginas visitadas), para fins de segurança e funcionamento do serviço.
        </li>
        <li>
          Cookies e tecnologias semelhantes podem ser usados pelo Google AdSense para exibição de anúncios (veja a
          seção abaixo e nossa <Link href="/cookies">Política de Cookies</Link>).
        </li>
      </ul>

      <h2>Seus direitos (LGPD)</h2>
      <p>
        Como não coletamos dados pessoais além do que foi descrito acima, há pouco a acessar, corrigir ou excluir.
        Ainda assim, se tiver qualquer dúvida ou solicitação relacionada aos seus dados, entre em contato pelo
        e-mail <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
      </p>

      <h2>Crianças e adolescentes</h2>
      <p>O Image Changer não é direcionado a menores de 18 anos e não coleta intencionalmente dados de menores.</p>

      <h2>Alterações nesta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. A data no topo desta página indica a versão mais recente.
      </p>
    </LegalLayout>
  );
}
