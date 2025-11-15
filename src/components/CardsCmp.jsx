import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function BasicCard({ time, discription, data, dot }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80%",
        background:
          "linear-gradient(135deg, #00838f, #5fa8a1, #18d7ec, #0b8591)",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center",
        width: "97%",
        overflow: "auto",
        "@media (max-width: 668px)": {
          flexWrap: "wrap",
        },
      }}
      id="CardId"
    >
      <Card
        sx={{
          height: "80%",
          transition: "all .4s ease",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #56a4acff, #51777aff)",
          margin: "4px",
          width: "26%",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.07)",
            boxShadow: 5,
            transition: ".3s",
            background: "#1b7780ff",
          },
          "@media (max-width: 768px)": {
            minWidth: "80px",
            minHeight: "100px",
          },
          overflow: "auto",
        }}
      >
        <CardContent
          sx={{ color: "white", wordWrap: "break-word", whiteSpace: "normal" }}
        >
          <LightModeIcon sx={{ fontSize: "25px", color: "black" }} />
          <Typography>
            {time?.dayOfWeek ? time?.dayOfWeek : `loading${dot}`}
          </Typography>
          <Typography>
            {Math.round(data?.data?.main?.temp)
              ? Math.round(data?.data?.main?.temp)
              : `loading${dot}`}
            &#176;C
          </Typography>
          <Typography>{discription ? discription : `loading${dot}`}</Typography>
        </CardContent>
      </Card>

      {/*🌤 Expectations for the Next Days */}
      <Card
        sx={{
          height: "80%",
          marginTop: "5px",
          transition: "all .4s ease",
          borderRadius: "15px",
          background: "#0b8591",
          width: "26%",
          margin: "4px",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.06)",
            boxShadow: 5,
            background: "none",
          },
          "@media (max-width: 768px)": {
            minWidth: "80px",
            minHeight: "100px",
          },
          overflow: "auto",
        }}
      >
        <CardContent
          sx={{ color: "white", wordWrap: "break-word", whiteSpace: "normal" }}
        >
          <LightModeIcon sx={{ fontSize: "25px", color: "black" }} />
          <Typography>Tomorrow</Typography>
          <Typography>33&#176;C</Typography>
          <Typography>clear sky</Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          height: "80%",
          transition: "all .4s ease",
          borderRadius: "15px",
          background: "#0b8591",
          width: "26%",
          margin: "4px",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.06)",
            boxShadow: 5,
            background: "none",
          },
          "@media (max-width: 768px)": {
            minWidth: "80px",
            minHeight: "100px",
          },
          overflow: "auto",
        }}
      >
        <CardContent
          sx={{ color: "white", wordWrap: "break-word", whiteSpace: "normal" }}
        >
          <LightModeIcon sx={{ fontSize: "25px", color: "black" }} />
          <Typography>Next Day</Typography>
          <Typography>32&#176;C</Typography>
          <Typography>clear sky</Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          height: "80%",
          transition: "all .4s ease",
          borderRadius: "15px",
          background: "#0b8591",
          width: "26%",
          margin: "4px",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.06)",
            boxShadow: 5,
            background: "none",
          },
          "@media (max-width: 768px)": {
            minWidth: "80px",
            minHeight: "100px",
          },
          overflow: "auto",
        }}
      >
        <CardContent
          sx={{ color: "white", wordWrap: "break-word", whiteSpace: "normal" }}
        >
          <LightModeIcon sx={{ fontSize: "25px", color: "black" }} />
          <Typography>Next Day</Typography>
          <Typography>34&#176;C</Typography>
          <Typography>clear sky</Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
