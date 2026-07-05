import LegalLayout from "../components/LegalLayout";

export default function Privacidade() {
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
          seção abaixo e nossa <a href="/cookies">Política de Cookies</a>).
        </li>
      </ul>

      <h2>Publicidade (Google AdSense)</h2>
      <p>
        Este site pode exibir anúncios fornecidos pelo Google AdSense. O Google pode usar cookies para exibir
        anúncios com base em visitas suas a este e a outros sites. Você pode desativar a publicidade personalizada
        nas{" "}
        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
          Configurações de Anúncios do Google
        </a>{" "}
        ou consultar como o Google trata seus dados na{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          política de tecnologias de anúncios do Google
        </a>
        .
      </p>

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
