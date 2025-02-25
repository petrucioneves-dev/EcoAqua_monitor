import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  WaterDrop,
  Visibility,
  BatteryFull,
  Wifi,
  Sensors,
  Settings,
  Dashboard,
  Opacity,
  ArrowForwardIos,
  ExpandMore,
} from "@mui/icons-material";
import "../Home/Home.css";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { getSensor } from "../../utils/api";
import { differenceInMinutes, differenceInHours } from "date-fns";
import MonitoringCards from "../../components/MonitoringCards/MonitoringCards";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [data, setData] = useState();
  async function getData() {
    const response = await getSensor();
    setData(response);
  }

  useEffect(() => {
    if (data === null) {
      getData();
    } else {
      const interval = setInterval(() => {
        getData();
      }, 20 * 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const sensor = useMemo(() => {
    {
      if (!data || data.length === 0) return [];
      console.log("data", data);

      const latestData = data;
      console.log("latestData", latestData.id);
      const sensorDateTime = new Date(latestData.createdAt);
      const now = new Date();

      const diffMinutes = differenceInMinutes(now, sensorDateTime);
      const diffHours = differenceInHours(now, sensorDateTime);

      let timeAgo;
      if (diffMinutes < 60) {
        timeAgo = `Há ${diffMinutes} minutos`;
      } else {
        timeAgo = `Há ${diffHours} horas`;
      }

      return [
        {
          title: "PH",
          value: `${latestData.pH.toFixed(2)} pH`,
          icon: <WaterDrop sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: timeAgo,
        },
        {
          title: "Turbidez",
          value: `${latestData.Turbidez.toFixed(2)} NTU`,
          icon: <Visibility sx={{ fontSize: 40, color: "#000" }} />,
          time: timeAgo,
        },
        {
          title: "TDS",
          value: `${latestData.TDS.toFixed(2)} mg/L`,
          icon: <Sensors sx={{ fontSize: 40, color: "#007BFF" }} />,
          time: timeAgo,
        },
        {
          title: "Bateria",
          value: `${((latestData.BaterySlave / 4.2) * 100).toFixed(2)}%`, // Convertendo a voltagem para porcentagem
          icon: <BatteryFull sx={{ fontSize: 40, color: "#28a745" }} />,
          time: timeAgo,
        },
      ];
    }
  }, [data]);
  console.log("sensor", sensor);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          bgcolor: "#EAF0F6",
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "white",
            p: 1,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            position: "fixed",
            top: 0,
            left: -1,
            height: "64px",
            zIndex: 1000,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2c3e50", ml: 3 }}
          >
            EcoAqua Monitor
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              Hello Arthur
            </Typography>
            <IconButton>
              <ExpandMore />
            </IconButton>
            <Avatar alt="Arthur" src="https://via.placeholder.com/40" />
          </Box>
        </Box>

        <Box sx={{ mt: "100px", display: "flex", flex: 1, p: 3, gap: "20px" }}>
          {/* coluna a esquerda */}
          <Box
            sx={{
              width: 400,
              bgcolor: "#EAF0F6",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              borderRadius: "10px",
              gap: "10px",
            }}
          >
            {[
              { icon: <Dashboard fontSize="large" />, label: "Dashboard" },
              { icon: <WaterDrop fontSize="large" />, label: "pH" },
              { icon: <Visibility fontSize="large" />, label: "Turbidez" },
              { icon: <Sensors fontSize="large" />, label: "TDS" },
              { icon: <BatteryFull fontSize="large" />, label: "Bateria" },
              { icon: <WaterDrop fontSize="large" />, label: "Water" },
              { icon: <Wifi fontSize="large" />, label: "Wi-Fi" },
              { icon: <Settings fontSize="large" />, label: "Ajustes" },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "90%",
                  px: 2,
                  py: 1,
                  borderRadius: "16px",
                  cursor: "pointer",
                  bgcolor: activeTab === item.label ? "#1E3A5F" : "transparent",
                  color: activeTab === item.label ? "white" : "#1E3A5F",
                  transition: "0.3s",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: activeTab === item.label ? "#162C47" : "#D6E2F0",
                  },
                }}
                onClick={() => setActiveTab(item.label)}
              >
                <IconButton sx={{ color: "inherit" }}>{item.icon}</IconButton>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
          {activeTab === "Dashboard" && <MonitoringCards sensor={sensor} />}
          {activeTab === "pH" && <HistoryTable />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: 300,
            }}
          >
            {[
              {
                title: "Notificações",
                content: [
                  {
                    text: "pH muito ácido",
                    time: "há 2 horas",
                    color: "#9B2C2C",
                  },
                  {
                    text: "Bateria Completa",
                    time: "há 3 horas",
                    color: "#276749",
                  },
                  {
                    text: "Backup do dia armazenado",
                    time: "há 16 horas",
                    color: "#276749",
                  },
                ],
                icon: <ArrowForwardIos sx={{ fontSize: 18, color: "#bbb" }} />,
              },
              {
                title: "Wi-Fi",
                content: [
                  { text: "Rede: Eduroam UFC" },
                  { text: "Status: conectado" },
                ],
                icon: <Wifi />,
              },
              {
                title: "Lora",
                icon: <Opacity />,
                content: [{ text: "Status: conectado" }],
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#2c3e50" }}
                    >
                      {item.icon} {item.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />

                  {item.content.map((textItem, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: textItem.color || "transparent",
                          borderRadius: "50%",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#2c3e50",
                          }}
                        >
                          {textItem.text}
                        </Typography>
                        {textItem.time && (
                          <Typography
                            sx={{ fontSize: "12px", color: "#718096" }}
                          >
                            {textItem.time}
                          </Typography>
                        )}
                      </Box>
                    </Typography>
                  ))}
                </CardContent>

                {/* lora e wifi */}
                {item.title !== "Notificações" && (
                  <Box
                    sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {item.icon}
                    <Switch
                      defaultChecked
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#1E3A5F",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            bgcolor: "#1E3A5F",
                          },
                      }}
                    />
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
