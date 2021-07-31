import { PaginatedLink } from './PaginatedLink';
import { DocumentNode } from 'graphql';
import { useLocation } from 'react-router';
import { useQuery } from 'react-apollo';
import { List } from '../shared/List';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';

interface PaginatedListProps {
  query: DocumentNode;
  dataName: string;
  component: React.ElementType;
  variables?: {};
}

export const PaginatedList: React.FC<PaginatedListProps> = ({ query, dataName, variables, component: Component }) => {
  const { search } = useLocation();
  const page = +(new URLSearchParams(search).get('page') || '1');

  const { data, error } = useQuery(query, { variables: { ...variables, paginationInput: { page } } });

  if (data) {
    return (
      <>
        <List data={data[dataName].data} component={Component} />
        <PaginatedLink currentPage={page} pages={data[dataName].pages} />
      </>
    );
  }
  if (error) return <Error />;
  return <Loading />;
};
