// @flow

import type { SliderQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import TextField from "@material-ui/core/TextField"
import Slider from "@material-ui/lab/Slider"

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const SpacedRow = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: SliderQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  const [textFieldText, changeTextFieldText] = useState(answer)
  return (
    <QuestionContainer
      question={question}
      answered={answer !== undefined}
      fadedTitle={question.unit ? `(${question.unit})` : undefined}
    >
      <Row>
        <TextField
          style={{
            border: "1px solid #ccc",
            borderRadius: 2,
            marginRight: 10,
            width: 80
          }}
          inputProps={{ style: { textAlign: "center" } }}
          value={textFieldText}
          onChange={e => {
            const tft = e.target.value
            changeTextFieldText(tft)
            const tfn = parseFloat(tft)
            if (!isNaN(tfn) && tfn <= question.max && tfn >= question.min) {
              changeAnswer(tfn)
              onChangeAnswer(tfn)
            }
          }}
        />
        <Col>
          <Slider
            onChange={(e, value) => {
              changeAnswer(value)
              changeTextFieldText(value)
              onChangeAnswer(value)
            }}
            style={{ opacity: answer === undefined ? 0.5 : 1 }}
            value={
              answer === undefined ? (question.max + question.min) / 2 : answer
            }
            min={question.min}
            max={question.max}
            step={question.step || 1}
          />
          <SpacedRow>
            <QuestionText>{question.min}</QuestionText>
            <QuestionText>{question.max}</QuestionText>
          </SpacedRow>
        </Col>
      </Row>
    </QuestionContainer>
  )
}
