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
  background-color: #EFE1CE;
  border: 1px solid;
  border-radius: 5px;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-righ: auto;
  min-width: 40vw;
  max-width: 50vw;
`

const Helpful = styled.div`
font-size: 14px;
margin-right: 10px;
margin-top: 10px;
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

const Size = styled.span`
  text-size: 12px;
`

const AnswersList = ({answer, id, productName, handleHelpful, handleReported, question_id, aRerender, setARerender}) => {
  let {answer_id, body, date, answerer_name, helpfulness, photos} = answer;
  let [modal, setModal] = useState(false);
  let [url, setUrl] = useState('');
  let [aHelpful, setAHelpful] = useState(false);
  let [aReported, setAReported] = useState(false);

  const toggleModal = (e) => {
    // console.log(e.target.currentSrc);
    setUrl(e.target.currentSrc);
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <Answer>
      <span>{body}</span>
      <User>
        {answerer_name.toLowerCase() === "seller" ?
          <Size>by <b>Seller</b>, </Size> :
          <Size>by {answerer_name}, </Size>
        }
        <span> {format(parseISO(date), 'MMMM, dd, yyyy')} </span>

        <div>
          {photos.map((photo, index) => {
            return  <Image
                      src={photo.url}
                      key={index}
                      onClick={toggleModal}
                      alt="unable to display">
                    </Image>
          })}
          {modal && (
            <ImageModal
              url={url}
              toggleModal={toggleModal}
              modal={modal}
            />)}
        </div>
        <Helpful> Helpful?
          <Yes onClick={() =>
            handleHelpful(
              aHelpful,
              'answers',
              answer_id,
              'helpful',
              setAHelpful,
              aRerender,
              setARerender
            )}>Yes &#40;{helpfulness}&#41;
          </Yes> |
          <Report onClick={() =>
            handleReported(
              aReported,
              'answers',
              answer_id,
              'report',
              setAReported
            )}> {aReported ? 'Reported' : 'Report'} </Report>
        </Helpful>
      </User>
    </Answer>
  )
}

export default AnswersList;