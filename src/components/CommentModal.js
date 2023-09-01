import React, { useState, useEffect } from 'react';
import { t } from "i18next";
import { Modal, Form } from 'react-bootstrap';
import { Toast } from "./Toast";
import { postHoaxComment, getHoaxComments, getOldComments, deleteComment } from '../api/apiCalls';
import ButtonWithProgress from "./ButtonWithProgress";
import CommentView from './CommentView';

const CommentModal = ({ show, onHide, hoax, currentUsername }) => {
  const [userComment, setUserComment] = useState('');
  const [commentPage, setCommentPage] = useState({ content: [], last: true, number: 0 });
  const { content, last } = commentPage;
  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [commentStyle, setCommentStyle] = useState({ maxHeight: 300, overflowY: 'hidden' });

  const loadOldComments = async () => {
    const lastComment = content[content.length - 1];
    setPendingApiCall(true);
    try {
      const response = await getOldComments(hoax.id, lastComment.id);
      setCommentPage(
        (previousCommentPage) => ({
          ...response.data,
          content: [...previousCommentPage.content, ...response.data.content],
        }));
      setPendingApiCall(false);
    } catch (error) {
      setPendingApiCall(false);
      Toast.fire({
        icon: 'error',
        title: t('Something went wrong'),
      });
    }
  };

  const onClickDelete = async (id) => {
    try {
        await deleteComment(id);
        Toast.fire({
            icon: 'success',
            title: t('Comment Deleted')
        });
        //close modal
        onHide();
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: t('Something went wrong')
        });
    }
        
  };

  useEffect(() => {
    const loadComments = async () => {
      setPendingApiCall(true);
      try {
        const response = await getHoaxComments(hoax.id);
        setCommentPage(
          (previousCommentPage) => ({
            ...response.data,
            content: [...previousCommentPage.content, ...response.data.content],
          }));
          if(response.data.totalElements > 2) {
            setCommentStyle({ maxHeight: 300, overflowY: 'scroll' });
          }
        setPendingApiCall(false);
      } catch (error) {
        setPendingApiCall(false);
        Toast.fire({
          icon: 'error',
          title: t('Something went wrong'),
        });
      }
    };
    loadComments();
  }, [hoax.id]);


  const handleAddComment = async () => {
    setPendingApiCall(true);
    try {
        const body = {
            content: userComment,
            hoaxId: hoax.id,
            username: currentUsername
        };
        await postHoaxComment(hoax.id, body);
        setPendingApiCall(false);
        Toast.fire({
            icon: 'success',
            title: t('Your comment is sent')
        });
    } catch(error) {
        setPendingApiCall(false);
        if(error.response.data.status == 400 ) {
            Toast.fire({
                icon: 'error',
                title: t('Your comment must between 1 and 255 characters')
            });
        }else {
            Toast.fire({
                icon: 'error',
                title: t('Something went wrong')
            });
        }
            
    }
    
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Comments')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentInput">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={t('Your comment')}
            value={userComment}
            onChange={handleCommentChange}
          />
          <div className='text-end mt-2'>
            <ButtonWithProgress className={"btn col-md-12 gradient-background text-light"} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Add Comment')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => handleAddComment()}></ButtonWithProgress>
          </div>
        </Form.Group>
        <div className='mt-4' style={commentStyle}>
          {content.map((content, id) => {
            return (
              <CommentView key={content.id} content={content} onClickDelete={onClickDelete} />
            );
          }
            )}
            {!last && (
              <ButtonWithProgress className={"btn col-md-12 gradient-background text-light mt-2"} pendingApiCall={pendingApiCall} disabled={pendingApiCall || last} text={t('Load More')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => loadOldComments()}></ButtonWithProgress>
            )}
          </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
