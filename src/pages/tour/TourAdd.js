import * as React from 'react';
import { MainArea, StyledCard, CardInner, AddUl } from "../../components";

import { useForm, Controller } from "react-hook-form";
import { postTour } from "../../apis";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NotesIcon from '@mui/icons-material/Notes';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

export function TourAddPage({ setHdTitle }) {  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  const onSubmit = data => { 
    //console.log(data);
    postTour(data, 'add');
  }

  return (
    <>{/* MainAreaはOtherAddPage */}
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <h2 className="font_main">ツアー</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="ツアー名"
                  fullWidth
                  required
                  variant="standard"
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && errors.name.message}
                />
              </li>
              <li>
                <TextField
                  label="メモ"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NotesIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("memo")}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
                />
              </li>
              <li>
                <TextField
                  fullWidth
                  {...register("iconColor", { required: true })}
                  className="three"
                  margin="normal"
                  variant="standard"
                  defaultValue="1"
                  select
                  onChange={e => setValue('iconColor', e.target.value, true)}
                  label="ツアー色"
                >
                  <MenuItem value="1">
                    赤
                  </MenuItem>
                  <MenuItem value="2">
                    黄
                  </MenuItem>
                  <MenuItem value="3">
                    緑
                  </MenuItem>
                  <MenuItem value="4">
                    青
                  </MenuItem>
                </TextField>
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                新規登録
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </>
  );
}