import LegalLayout from "../components/LegalLayout";
import { useLocale } from "../utils/i18n";

export default function Sobre() {
  const locale = useLocale();

  if (locale === "en") {
    return (
      <LegalLayout
        title="About"
        path="/sobre"
        updatedAt="25/07/2026"
        description="Get to know Image Changer: an independent image conversion and editing project, built to run 100% in the browser, with no registration and no files ever sent to a server."
      >
        <p>
          Image Changer was born from a simple need: converting and editing images quickly, without having to
          install programs, create accounts, or send personal files to unknown servers.
        </p>

        <h2>Why this site exists</h2>
        <p>
          Many online image conversion tools require registration, show aggressive ads, or upload your images to a
          server for processing — which raises legitimate privacy concerns. Image Changer was built to solve that:
          all processing happens directly in your browser, using your device's native APIs. No image you convert or
          edit here ever leaves your computer or phone.
        </p>

        <h2>Who maintains the project</h2>
        <p>
          Image Changer is independently developed and maintained by José Victor, with a focus on simplicity and
          performance: no registration, no backend, and no database. The code runs entirely on the front end, with
          conversions and edits done via the browser's Canvas API.
        </p>

        <h2>What you'll find here</h2>
        <ul>
          <li>Conversion between PNG, JPG, and WebP</li>
          <li>Cropping, resizing, compression, rotation, and mirroring of images</li>
          <li>Batch conversion of up to 5 images at once</li>
        </ul>
        <p>
          New formats and tools are added gradually, always prioritizing local processing and ease of use.
        </p>

        <h2>Contact</h2>
        <p>
          Found a bug, or have a suggestion? You can also reach out by email:{" "}
          <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      title="Sobre"
      path="/sobre"
      updatedAt="25/07/2026"
      description="Conheça o Image Changer: um projeto independente de conversão e edição de imagens, criado para funcionar 100% no navegador, sem cadastro e sem enviar arquivos para servidores."
    >
      <p>
        O Image Changer nasceu de uma necessidade simples: converter e editar imagens rapidamente, sem precisar
        instalar programas, criar contas ou enviar arquivos pessoais para servidores desconhecidos.
      </p>

      <h2>Por que este site existe</h2>
      <p>
        Muitas ferramentas de conversão de imagem online pedem cadastro, exibem anúncios agressivos ou fazem
        upload das suas imagens para processar em um servidor — o que levanta dúvidas legítimas sobre privacidade.
        O Image Changer foi construído para resolver isso: todo o processamento acontece diretamente no seu
        navegador, usando as APIs nativas do próprio dispositivo. Nenhuma imagem que você converte ou edita aqui
        chega a sair do seu computador ou celular.
      </p>

      <h2>Quem mantém o projeto</h2>
      <p>
        O Image Changer é desenvolvido e mantido de forma independente por José Victor, com foco em simplicidade e
        desempenho: sem cadastro, sem backend e sem banco de dados. O código roda inteiramente no front-end, com
        conversões e edições feitas via Canvas API do navegador.
      </p>

      <h2>O que você encontra aqui</h2>
      <ul>
        <li>Conversão entre PNG, JPG e WebP</li>
        <li>Corte, redimensionamento, compressão, rotação e espelhamento de imagens</li>
        <li>Conversão em lote de até 5 imagens simultaneamente</li>
      </ul>
      <p>
        Novos formatos e ferramentas são adicionados aos poucos, sempre priorizando o processamento local e a
        simplicidade de uso.
      </p>

      <h2>Contato</h2>
      <p>
        Encontrou um problema, ou tem alguma sugestão? Pode entrar em contato por e-mail:{" "}
        <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
