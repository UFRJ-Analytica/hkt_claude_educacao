import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Page, PageTitle, TopBar } from '@/components/shell';

export function NaoEncontrado() {
  return (
    <>
      <TopBar />
      <Page>
        <PageTitle>Página não encontrada</PageTitle>
        <p className="mb-6 text-ink-2">O endereço pode estar errado ou a página foi movida.</p>
        <Button render={<Link to="/app" />} size="xl">
          Voltar ao início
        </Button>
      </Page>
    </>
  );
}
