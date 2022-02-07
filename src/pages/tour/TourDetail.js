import { MainArea, FormatUpdate, StyledCard, CardInner, AddUl} from "../../components";
import { handleDeleteTour } from "../../apis";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postTour } from "../../apis";
import TextField from '@mui/material/TextField';
import NotesIcon from '@mui/icons-material/Notes';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { blueGrey } from '@mui/material/colors';

export function TourDetailPage({ tour }) {
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const history= useHistory();
  const onSubmit = data => { 
    data.id = tour.id;
    console.log(data);
    postTour(data, 'edit').then(()=>{
      history.go(0);//レンダリング
    });
  }  
  const onDelete = data => { 
    data.id = tour.id;
    data.removed = true;
    console.log(data);
    postTour(data, 'edit').then(()=>{
      history.push({ pathname: '/', state: { rootIndex: 1 }});
      //遷移先にrootIndexを渡す　→　`ツアー一覧に飛ぶ
    });
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
          <form onSubmit={handleSubmit(onDelete)} className="bin_icon">
            <button type="submit"><DeleteIcon sx={{ color: blueGrey[500] }}/></button>
          </form>
          <FormatUpdate updateAt={tour.updatedAt}/>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}

