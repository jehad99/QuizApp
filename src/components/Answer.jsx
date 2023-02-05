import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green, red } from '@mui/material/colors';

export default function Answer({ qnAns }) {
  const [expanded, setExpanded] = useState(false)

  console.log()
  
  const mark = (qna, idx) => {
    if ([(qna.answer-1), (qna.selected)].includes(idx)) {
      return {sx: {color:qna.answer-1 == idx ? green[500]:red[500]}}
    }
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded? panel : false)
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 640, mx: 'auto', mt: 5 }}>
      {
        qnAns.map((item, j) => (
        <Accordion
            key={j}
            expanded={expanded === j}
            onChange={handleChange(j)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: item.answer==(item.selected + 1) ? green[500] : red[500]}} />}>
            <Typography sx={{width:"90%", flexShrink:0}}>
                {item.qnInWords}
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
              {item.imageName ? 
                <CardMedia
                  component='img'
                  image={BASE_URL + 'images/' + qns[qnIndex].imgName}
                  sx={{ m: '10px auto', width: auto }}
                /> : null}
              <List> 
                {item.options.map((opt, idx) => 
                  <ListItem key={idx} >
                    <Typography {...mark(item, idx)}>
                      <b>{String.fromCharCode(65+idx)+'.'}</b>
                      {opt}
                    </Typography>
                  </ListItem>
                )}
              </List>
          </AccordionDetails>
        </Accordion>
        ))
      }
    </Box>
  )
}
