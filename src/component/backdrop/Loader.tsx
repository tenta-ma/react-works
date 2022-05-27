import { Backdrop, CircularProgress } from "@mui/material";

/**
 * ローディングアイコン
 *
 * @returns ローディングアイコン
 */
export const Loader: React.FC<{
  isLoading: boolean;
}> = ({ isLoading }): JSX.Element => {
  return (
    <Backdrop
      sx={{
        marginTop: 0,
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
      data-testid="loading-backdrop">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
