import { MainArea, FormatUpdate, StyledCard, CardInner, AddUl} from "../../components";
import { handleDeleteTour } from "../../apis";
import { useForm } from "react-hook-form";
import { postTour } from "../../apis";
import TextField from '@mui/material/TextField';
import NotesIcon from '@mui/icons-material/Notes';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';




function TourDeleteButton({ tour }) {
  
  return (
    <>
      <form onSubmit={handleDeleteTour}>
        <input type="hidden" name="id" value={tour.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}


export function TourDetailPage({ tour }) {
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const onSubmit = data => { 
    data.id = tour.id;
    console.log(data);
    postTour(data, 'edit');
  }
  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="ツアー名"
                  fullWidth
                  required
                  margin="normal"
                  variant="standard"
                  defaultValue={tour.name}
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && errors.name.message}
                />
              </li>
              <li>
                <TextField
                  label="メモ"
                  fullWidth
                  id="select"
                  margin="normal"
                  multiline
                  rows={2}
                  variant="standard"
                  defaultValue={tour.memo}
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
                  defaultValue={tour.iconColor}
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
                更新
              </Button>
            </AddUl>
          </form>
          {/* <StyledDeleteButton />作成中 */}
          <FormatUpdate updateAt={tour.updatedAt}/>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}

