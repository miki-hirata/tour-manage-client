import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { MainArea, StyledCard, CardInner, AddUl, FormatDate, FormatUpdate, HeadMainFont, HeadSubFont, StyledEditButton } from "./index";
import styled from "styled-components";

import { postEventSches, getEventSches, getEventCats, getTours } from "../apis";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import NotesIcon from '@mui/icons-material/Notes';
import { useForm, Controller } from "react-hook-form";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function AddEventSches({ event }) {  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const onSubmit = data => { 
    data.EventId = event.id;
    console.log(data);
    postEventSches(data, 'add');
  }
  return (
    <>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <h2 className="font_main">スケジュール追加</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="スケジュール名  ex) 開演、終演"
                  fullWidth
                  required
                  variant="standard"
                  {...register("name", { required: true })}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && "必須・100文字以内"}
                />
              </li>
              <li>
                <TextField
                  label="時間"
                  fullWidth
                  required
                  variant="standard"
                  {...register("time", { required: true })}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && "必須・100文字以内"}
                />
              </li>
              <li>
                <TextField
                  label="このスケジュールについてのメモ"
                  fullWidth
                  variant="standard"
                  {...register("time", { required: true })}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && "必須・100文字以内"}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                追加
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </>
  );
}

/* function EventSchesTable({ eventSches }) {

  return (
    
    <StyledCard
    variant="outlined"
  >
    <CardInner>
      <Table>
          {eventSches.map((eventSche) => (
            <TableRow
              key={eventSche.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th">{eventSche.time}</TableCell>
              <TableCell>{eventSche.name}</TableCell>
              <TableCell>{eventSche.memo}</TableCell>
            </TableRow>
          ))}
      </Table>
    </CardInner>
    </StyledCard>
  );
}
 */

function EventSchesTable({ eventSches }) {

  return (
    
    <StyledCard
    variant="outlined"
  >
    <CardInner>
      <EventSchesStyle>
        <table>
            {eventSches.map((eventSche) => (
              <tr
                key={eventSche.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <td>{eventSche.time}</td>
                <td>{eventSche.name}</td>
                <td>{eventSche.memo}</td>
              </tr>
            ))}
        </table>
      </EventSchesStyle>
    </CardInner>
    </StyledCard>
  );
}


const EventSchesStyle = styled.div`
tr{
  display: flex;
  padding: 8px 0;
  td{
    &:nth-child(2){
      width: 100px;
    }
  }
}
`;


export function EventSches({ event }) {
  const [eventSches, setEventSches] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getEventSches(params.eventId).then((data) => {
      if (!unmounted) {
        console.log(data);
        setEventSches(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);


  return (
    <>
      {eventSches != null &&
        <>
          {eventSches[0] == null ? (
            <StyledCard
              variant="outlined"
            >
              <CardInner>
                <p>スケジュールが登録されていません</p>
              </CardInner>
            </StyledCard>
          ) : (
            <EventSchesTable eventSches={eventSches} />
          )}
        </>
      }
      <AddEventSches event = {event}/>
    </>
  );
}


