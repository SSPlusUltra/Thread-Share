import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import classes from './commenthtml.module.css';
import { auth } from '../firebase';
import moment from 'moment';

export function CommentHtml(props) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text fz="sm">{auth.currentUser.displayName}</Text>
          <Text fz="xs" c="dimmed">
            {moment(props.comment.Timeago).fromNow()}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html:
              `${props.comment.text}`
          }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}