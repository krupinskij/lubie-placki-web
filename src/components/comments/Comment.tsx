import Typography from '@material-ui/core/Typography';

import { CardBody, CardContainer, CardHeader } from '../card/Card';

import { Comments } from '../../typings/types';

export function Comment({ _id, text, createdAt, owner }: Comments.Comment) {
  return (
    <CardContainer>
      <CardHeader author={owner} createdAt={createdAt} />
      <CardBody>
        <Typography>{text}</Typography>
      </CardBody>
    </CardContainer>
  );
}
