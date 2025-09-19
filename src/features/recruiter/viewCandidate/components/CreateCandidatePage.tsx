import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  InputLabel,
  Typography,
} from "@mui/material";
import AnimatedButton from "@/components/AnimatedButton";
import { useCreateCandidate } from "@/features/recruiter/viewCandidate/useCreateCandidate";
import { setAppLoading } from "@/store/appSlice";
import { useDispatch } from "react-redux";

interface CreateCandidateModalProps {
  job_position_public_id?: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCandidateModal: React.FC<CreateCandidateModalProps> = ({
  job_position_public_id,
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    job_position_public_id: job_position_public_id || "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number_raw: "",
    phone_country_code: "+1",
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!open) {
      setForm({
        job_position_public_id: job_position_public_id || "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number_raw: "",
        phone_country_code: "",
        resume: null,
      });
      setSubmitting(false);
    }
  }, [job_position_public_id, open]);

  const { mutate: createCandidate, isPending } = useCreateCandidate({
    onSuccess,
  });

  useEffect(() => {
    dispatch(setAppLoading(isPending));
  }, [isPending, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.resume) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append("job_position_public_id", form.job_position_public_id);
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("email", form.email);
    formData.append("phone_number_raw", form.phone_number_raw);
    formData.append("phone_country_code", form.phone_country_code);
    // formData.append("resume", form.resume);

    createCandidate(formData);
  };

  const isFormValid =
    form.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.resume !== null &&
    form.phone_number_raw.trim() !== "" &&
    form.phone_country_code.trim() !== "";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Candidate</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            fullWidth
            error={
              form.email !== "" &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
            }
            helperText={
              form.email !== "" &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                ? "Please enter a valid email"
                : " "
            }
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Country Code"
              name="phone_country_code"
              value={form.phone_country_code}
              onChange={handleChange}
              sx={{ minWidth: 150 }}
            />
            <TextField
              label="Phone Number"
              name="phone_number_raw"
              value={form.phone_number_raw}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Box>
            <InputLabel shrink>Resume (PDF or DOC)</InputLabel>
            <AnimatedButton label="Upload Resume" onClick={handleUploadClick} />
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {form.resume && (
              <Typography
                variant="body2"
                mt={1}
                color="text.secondary"
                sx={{ wordBreak: "break-all" }}
              >
                {form.resume.name} ({(form.resume.size / 1024).toFixed(1)} KB)
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid || submitting}
        >
          {submitting ? "Submitting..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCandidateModal;
