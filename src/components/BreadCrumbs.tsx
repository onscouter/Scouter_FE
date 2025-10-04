import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";

const labelMap: Record<string, string> = {
  recruiter: "Home",
  admin: "Home",
  interviewer: "Home",
  "create-job": "Create Job",
  "edit-job": "Edit Job",
  "competency-rubric": "Competency Rubric",
  "schedule-interview": "Schedule Interview",
  jobs: "Jobs",
  view: "Candidate",
};

const getRoleRoot = (pathname: string) => {
  if (pathname.startsWith("/admin")) return "/admin";
  if (pathname.startsWith("/recruiter")) return "/recruiter";
  if (pathname.startsWith("/interviewer")) return "/interviewer";
  return null;
};

const isPublicId = (segment: string) => {
  return (
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      segment
    ) || /^[0-9]+$/.test(segment)
  );
};

const formatSegment = (segment: string) => {
  if (labelMap[segment]) return labelMap[segment];
  return segment
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter(Boolean);
  const roleRoot = getRoleRoot(pathname);

  if (roleRoot && pathname === roleRoot) {
    return null;
  }

  return (
    <Box sx={{ mb: 2, mt: 1 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontSize: "0.875rem",
          color: "text.secondary",
        }}
      >
        {roleRoot && (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={roleRoot}
          >
            {formatSegment(roleRoot.replace("/", ""))}
          </Link>
        )}

        {pathnames.map((segment, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          if (index === 0) return null;

          if (isPublicId(segment)) {
            segment = "Details";
          }

          const label = formatSegment(segment);

          return isLast ? (
            <Typography color="text.primary" key={to} sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={to}
              key={to}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
