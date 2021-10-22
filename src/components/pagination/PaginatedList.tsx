import { PaginatedLink } from './PaginatedLink';
import { List } from '../shared/List';

interface PaginatedListProps<T extends { _id: string }> {
  data: T[];
  page: number;
  pages: number;
  component: React.ElementType;
}

export function PaginatedList<T extends { _id: string }>({
  data,
  page,
  pages,
  component: Component,
}: PaginatedListProps<T>) {
  return (
    <>
      <List data={data} component={Component} />
      <PaginatedLink currentPage={page} pages={pages} />
    </>
  );
}
