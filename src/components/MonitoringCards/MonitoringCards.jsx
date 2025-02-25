import { Box, Card, Typography, IconButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

export default function MonitoringCards({ sensor }) {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "50px",
          }}
        >
          {sensor.map((item, index) => (
            <Card
              key={index}
              sx={{
                p: 3,
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "500px",
                height: "180px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <IconButton>{item.icon}</IconButton>
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.time}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton>
                  <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
