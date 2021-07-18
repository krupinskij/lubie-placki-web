import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

interface PaginatedLinkProps {
  currentPage: number;
  pages: number;
}

const useStyles = makeStyles({
  paper: {
    marginTop: 25,
    padding: 5,
  },
});

export function PaginatedLink({ currentPage, pages }: PaginatedLinkProps) {
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      <Pagination
        page={currentPage}
        count={pages}
        color="primary"
        shape="rounded"
        size="large"
        renderItem={(item) => (
          <PaginationItem component={Link} to={`/${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
        )}
      />
    </Paper>
  );
}
