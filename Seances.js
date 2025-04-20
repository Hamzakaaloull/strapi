// Seances.js
"use client";
import {
  Box,
  Typography,
  Collapse,
  Alert,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Slide,
  Link as MuiLink,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  EventNote as EventNoteIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function Seances({
  activeSession,
  loadingSession,
  collapseOpen,
  setCollapseOpen,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 0, md: 4 } }}>
      {" "}
      {/* ✅ تغيير padding للجوال */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#2E3B55",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EventNoteIcon sx={{ color: "#009688" }} />
        Séance Active
      </Typography>
      <Collapse in={collapseOpen}>
        <Alert
          severity="success"
          sx={{
            bgcolor: "success.light",
            borderLeft: "4px solid #4CAF50",
            mb: 4,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setCollapseOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Votre présence a été enregistrée avec succès!
        </Alert>
      </Collapse>
      {loadingSession ? (
        <Skeleton variant="rectangular" height={200} />
      ) : activeSession ? (
        <Slide in timeout={600}>
          <TableContainer
            component={Box}
            sx={{
              borderRadius: 3,
              border: "1px solid #E0E0E0",
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              overflowX: "auto", // ✅ إضافة التمرير الأفقي
              width: { xs: "90vw", md: "auto" }, // ✅ عرض متجاوب
              minWidth: isMobile ? "320px" : "unset", // ✅ عرض مخصص للجوال
            }}
          >
            <TableContainer
              component={Box}
              sx={{
                width: "100%", // يشغل 100% من العرض الأب
                maxWidth: "100%", // يمنع تجاوزه للعرض
                overflowX: "auto", // يُفعّل التمرير الأفقي عند الحاجة
              }}
            >
              <Table
                sx={
                  {
                    // يمنع كسر النصوص داخل الخلايا
                  }
                }
              >
                <TableHead>
                  <TableRow>
                    {[
                      "Date",
                      "Heure de début",
                      "Heure de fin",
                      "Matière",
                      "Document",
                      "Brigade",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          fontWeight: 600,
                          borderBottom: "2px solid #E0E0E0",
                          whiteSpace: "nowrap", // منع تكسير النص
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "#F0F9FF",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      },
                    }}
                  >
                    <TableCell>
                      {new Date(activeSession.date).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>{activeSession.start_time}</TableCell>
                    <TableCell>{activeSession.end_time}</TableCell>
                    <TableCell>
                      {activeSession.cour?.title || "Matière non trouvée"}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(activeSession.cour?.cour_contant) &&
                      activeSession.cour.cour_contant.length > 0 ? (
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {activeSession.cour.cour_contant.map(
                            (file, index) => (
                              <MuiLink
                                key={index}
                                href={`http://localhost:1337${file.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  textDecoration: "none",
                                  color: "#1565C0",
                                  bgcolor: "#E3F2FD",
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: 2,
                                  display: "inline-block",
                                  transition: "transform 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  },
                                }}
                              >
                                📎 {file.name}
                              </MuiLink>
                            )
                          )}
                        </Box>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontStyle="italic"
                        >
                          Aucun document trouvé.
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {activeSession.brigade ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="body1" fontWeight={600}>
                            {activeSession.brigade.nom}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Stage: {activeSession.brigade.stage}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Effectif: {activeSession.brigade.Effectif_Theorique}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="error">
                          Brigade non trouvée
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TableContainer>
        </Slide>
      ) : (
        <Alert
          severity="info"
          sx={{
            bgcolor: "info.light",
            borderLeft: "4px solid #2196F3",
            mb: 4,
          }}
        >
          Aucune séance active trouvée.
        </Alert>
      )}
    </Box>
  );
}
