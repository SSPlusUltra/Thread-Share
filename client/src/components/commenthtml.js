import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import classes from './commenthtml.module.css';
import { auth } from '../firebase';
import moment from 'moment';

export function CommentHtml(props) {
   const requser = props.comment && props.udata && props.udata.find((item)=>item.id === props.comment.cid)
  const tempreq = requser && props.imgdata && props.imgdata.filter((item)=>item.user===requser.id)
  const reqimg = tempreq && tempreq.slice(-1)[0]

 
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src={reqimg && reqimg.image}
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text style={{wordBreak:'break-word', textDecoration:'none', color:'white'}} fz="sm">{props.comment.author}</Text>
          <Text fz="xs" c="dimmed">
            {moment(props.comment.Timeago).fromNow()}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div style={{wordBreak:'break-word', textDecoration:'none', color:'white'}}
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