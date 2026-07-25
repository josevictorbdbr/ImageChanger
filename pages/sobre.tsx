import LegalLayout from "../components/LegalLayout";

export default function Sobre() {
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
        Encontrou um problema, tem uma sugestão ou quer acompanhar o desenvolvimento do projeto? Acesse o GitHub:{" "}
        <a href="https://github.com/josevictorbdbr" target="_blank" rel="noopener noreferrer">
          github.com/josevictorbdbr
        </a>
        . Também é possível entrar em contato por e-mail:{" "}
        <a href="mailto:josevictorbdbr@gmail.com">josevictorbdbr@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
