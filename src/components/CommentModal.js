import React, { useState } from 'react';
import { t } from "i18next";
import { Modal, Button, Form } from 'react-bootstrap';
import { Toast } from "./Toast";
import Spinner from './Spinner';
import { postHoaxComment } from '../api/apiCalls';
import ButtonWithProgress from "./ButtonWithProgress";

const CommentModal = ({ show, onHide, hoax, currentUsername }) => {
  const [userComment, setUserComment] = useState('');
  const allUserComments = []; // Replace this with an array of all user comments
  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };
  const [pendingApiCall, setPendingApiCall] = useState(false);

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
        <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
          {/* Display all user comments here */}
          {allUserComments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
