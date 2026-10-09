import { useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBasket } from "../../lib/hooks/useBasket";
import { useGetProductsByIds } from "../../lib/hooks/useProduct";
import { useCurrentUser } from "../../lib/hooks/useUser";
import { useCreateOrder } from "../../lib/hooks/useOrder"; // <- fix path
import type { CreateOrderDto } from "../../lib/types/order"; // <- fix path

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data) return data;
    if (data?.title) return data.title; // ProblemDetails
    if (data?.errors) return Object.values(data.errors).flat().join(" "); // validation
    if (data?.message) return data.message;
    return `${error.response?.status ?? "Network"} error`;
  }
  return "Could not place your order. Please try again.";
}

export default function CreateOrder() {
  const navigate = useNavigate();
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { basket, totalItems, clearBasket } = useBasket();
  const createOrder = useCreateOrder();

  const [shippingAddress, setShippingAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const results = useGetProductsByIds(basket.map((x) => x.id));
  const isLoading = isUserLoading || results.some((r) => r.isLoading);
  const hasUnavailable = results.some((r) => !r.isLoading && !r.data);

  const subtotal = basket.reduce((sum, item, i) => {
    const product = results[i]?.data;
    return sum + (product ? Number(product.price ?? 0) * item.quantity : 0);
  }, 0);

  const addressError = touched && shippingAddress.trim().length < 10;

  // Step 1: validate, then open the confirmation dialog
  const handleSubmit = () => {
    setTouched(true);
    if (shippingAddress.trim().length < 10 || hasUnavailable) return;
    setConfirmOpen(true);
  };

  // Step 2: user confirmed, send the order
  const handleConfirm = () => {
    const dto: CreateOrderDto = {
      shippingAddress: shippingAddress.trim(),
      products: basket.map((x) => ({
        productId: x.id,
        quantity: x.quantity,
      })),
    };

    createOrder.mutate(dto, {
      onSuccess: () => {
        setConfirmOpen(false);
        clearBasket();
        navigate("/"); // <- change to your orders / success page
      },
      onError: () => setConfirmOpen(false), // close so the error alert is visible
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Must be logged in to order
  if (!currentUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
        <Alert severity="info" variant="outlined" sx={{ mb: 3 }}>
          Please log in to place an order.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Go to login
        </Button>
      </Container>
    );
  }

  // Nothing to order
  if (basket.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Your basket is empty
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Browse products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Button
        onClick={() => navigate("/basket")}
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, px: 0, color: "text.secondary" }}
      >
        Back to basket
      </Button>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        {/* Shipping form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping details
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ordering as {currentUser.firstName} {currentUser.lastName} (
              {currentUser.email})
            </Typography>

            <TextField
              label="Shipping address"
              placeholder="Street, building, city, postal code"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              onBlur={() => setTouched(true)}
              error={addressError}
              helperText={
                addressError ? "Please enter your full shipping address." : " "
              }
              multiline
              minRows={4}
              fullWidth
              required
            />
          </Paper>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            variant="outlined"
            sx={{ p: 3, position: { md: "sticky" }, top: { md: 24 } }}
          >
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {basket.map((item, i) => {
                const product = results[i]?.data;
                if (!product) return null;
                const price = Number(product.price ?? 0);

                return (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2">
                      {product.name} × {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${(price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">
                Items ({totalItems})
              </Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            {hasUnavailable && (
              <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
                Some products are no longer available. Remove them from your
                basket to continue.
              </Alert>
            )}

            {createOrder.isError && (
              <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
                {getErrorMessage(createOrder.error)}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              disabled={hasUnavailable}
            >
              Place order
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirm order dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => !createOrder.isPending && setConfirmOpen(false)}
        aria-labelledby="confirm-order-title"
      >
        <DialogTitle id="confirm-order-title">Place this order?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            You are about to order {totalItems} item(s) for a total of $
            {subtotal.toFixed(2)}.
          </DialogContentText>
          <DialogContentText>
            <strong>Shipping to:</strong> {shippingAddress.trim()}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            disabled={createOrder.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={createOrder.isPending}
          >
            {createOrder.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm order"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
