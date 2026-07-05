import LegalLayout from "../components/LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout title="Política de Cookies" path="/cookies" updatedAt="08/07/2026">
      <p>
        Cookies são pequenos arquivos armazenados pelo seu navegador. Esta página explica quais tipos usamos no
        Image Changer e para quê.
      </p>

      <h2>Cookie de preferência</h2>
      <p>
        Guardamos localmente no seu navegador (via <em>localStorage</em>) apenas a sua escolha sobre este próprio
        aviso de cookies, para não exibi-lo novamente a cada visita.
      </p>

      <h2>Cookies de publicidade (Google AdSense)</h2>
      <p>
        Podemos exibir anúncios do Google AdSense. O Google e seus parceiros podem usar cookies para exibir anúncios
        com base nas suas visitas a este e a outros sites. Não temos acesso a esses cookies nem aos dados que eles
        coletam.
      </p>
      <p>
        Você pode gerenciar ou desativar a publicidade personalizada diretamente nas{" "}
        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
          Configurações de Anúncios do Google
        </a>
        .
      </p>

      <h2>Como controlar cookies</h2>
      <p>
        Além das configurações do Google, você pode bloquear ou apagar cookies diretamente nas configurações do seu
        navegador. Isso não afeta o funcionamento das ferramentas de conversão e edição, que rodam localmente e não
        dependem de cookies.
      </p>

      <h2>Mais informações</h2>
      <p>
        Para saber como tratamos outras informações, consulte nossa{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
    </LegalLayout>
  );
}
