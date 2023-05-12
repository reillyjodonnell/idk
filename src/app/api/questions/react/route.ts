import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../prisma/prisma';

export async function POST(request: NextRequest) {
  const res = await request.json();
  const reaction = res.emoji;
  const commentId = res.commentId;
  const authorId = res.authorId;
  if (!reaction || !authorId || !commentId) {
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'No commentId, authorId, or emoji provided!',
    });
  }

  // ensure the reaction is one of the 4 emojis
  const validReactions = ['thumbsUp', 'thumbsDown', 'fire', 'eyes'];
  if (!validReactions.includes(reaction)) {
    return new Response('Invalid reaction!', {
      status: 500,
      statusText: 'Reaction not allowed!',
    });
  }

  try {
    const existingReaction = await db.reaction.findFirst({
      where: {
        commentId: commentId,
        authorId,
      },
    });

    if (existingReaction) {
      console.log(existingReaction);
      // Remove existing reaction
      await db.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });

      // If the existing reaction is different from the clicked emoji, add new reaction
      if (existingReaction.emoji !== reaction) {
        await db.reaction.create({
          data: {
            emoji: reaction,
            author: { connect: { id: authorId } },
            comment: { connect: { id: commentId } },
          },
        });
        // update the reaction on the Comment
        await db.comment.update({
          where: { id: commentId },
          data: {
            [reaction]: { increment: 1 },
            [existingReaction.emoji]: { decrement: 1 },
          },
        });
      }
      // otherwise this is the same reaction, so remove it
      else {
        // update the reaction on the Comment
        await db.comment.update({
          where: { id: commentId },
          data: { [reaction]: { decrement: 1 } },
        });
      }
    } else {
      // No existing reaction, create a new one
      await db.reaction.create({
        data: {
          emoji: reaction,
          author: { connect: { id: authorId } },
          comment: { connect: { id: commentId } },
        },
      });
      // update the reaction on the Comment
      await db.comment.update({
        where: { id: commentId },
        data: { [reaction]: { increment: 1 } },
      });
    }
    return new Response('Reaction created!', {
      status: 200,
      statusText: 'Reaction created!',
    });
  } catch (err) {
    console.error('Error reacting to comment:', err);
    return new Response('Something went wrong!', {
      status: 500,
      statusText: 'Reaction not updated/ created!',
    });
  }

  // try {
  //   // create a new Reaction
  //   await db.reaction.create({
  //     data: {
  //       emoji: reaction,
  //       author: { connect: { id: authorId } },
  //       comment: { connect: { id: commentId } },
  //     },
  //   });

  //   // increment the reaction on the Comment
  //   const updatedComment = await db.comment.update({
  //     where: { id: commentId },
  //     data: { [reaction]: { increment: 1 } },
  //   });

  //   if (!updatedComment) {
  //     return new Response('Something went wrong!', {
  //       status: 500,
  //       statusText: 'Reaction not updated!',
  //     });
  //   }

  //   return new Response('Reaction created!', {
  //     status: 200,
  //     statusText: 'Reaction created!',
  //   });
  // } catch (error) {
  //   console.error('Error reacting to comment:', error);
  // }
}
