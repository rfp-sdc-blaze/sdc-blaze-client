import { useState, useEffect, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import ImageModal from './Modals/ImageModal.jsx';
import axios from 'axios';
import swal from 'sweetalert';

const Image = styled.img`
  border-radius: 8px;
  display: inline-block;
  max-height: 100px;
  max-width: 100%;
  margin-right: 10px;
  margin-top: 3px;
`

const Answer = styled.div`
margin-bottom: 0.5em;
`

const Helpful = styled.span`
font-size: 14px;
margin-left: 40px;
`

const Yes = styled.button`
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
text-decoration: underline;
&:hover {
  color: darkgreen;
}
`

const Report = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  &:hover {
    color: crimson;
  }
`

const User = styled.div`
margin-top: 2px;
margin-left: 15px;
margin-bottom: 10px;
`

const Border = styled.div`
border-bottom: 1px solid black;
`

const AnswersList = ({answer, handleFeedback, question_id, aRerender, setARerender}) => {
  let {answer_id, body, date, answerer_name, helpfulness, photos} = answer;
  let [modal, setModal] = useState(false);
  let [url, setUrl] = useState('');
  let [clickedAHelpful, setClickedAHelpful] = useState(false);

  const toggleModal = (e) => {
    // console.log(e.target.currentSrc);
    setUrl(e.target.currentSrc);
    setModal(!modal);
  }

  return (
    <Answer>
      <span>{body}</span>
      <User>
        <span>by {answerer_name}, </span>
        <span> {format(parseISO(date), 'MMMM, dd, yyyy')} </span>
        <Helpful> Helpful? <Yes onClick={() => handleFeedback(clickedAHelpful, 'answers', answer_id, 'helpful', setClickedAHelpful, aRerender, setARerender)}>Yes &#40;{helpfulness}&#41;</Yes> | <Report onClick={() => handleFeedback(clickedAHelpful, 'answers', answer_id, 'report', setClickedAHelpful, aRerender, setARerender)}> Report </Report></Helpful>
        <div>
          {photos.map((photo, index) => {
            return  <Image
                      src={photo.url}
                      key={index}
                      onClick={toggleModal}
                      alt="unable to display">
                    </Image>
          })}
          {modal && (<ImageModal url={url} toggleModal={toggleModal} modal={modal}/>)}
        </div>
      </User>
      <Border></Border>
    </Answer>
  )
}

export default AnswersList;