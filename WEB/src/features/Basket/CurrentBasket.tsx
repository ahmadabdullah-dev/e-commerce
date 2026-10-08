import { useState } from "react";
import { useNavigate } from "react-router";
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
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useBasket } from "../../lib/hooks/useBasket";
import { useGetProductsByIds } from "../../lib/hooks/useProduct";

export default function CurrentBasket() {
  const navigate = useNavigate();
  const { basket, totalItems, setQuantity, removeFromBasket, clearBasket } =
    useBasket();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const results = useGetProductsByIds(basket.map((x) => x.id));
  const isLoading = results.some((r) => r.isLoading);

  const subtotal = basket.reduce((sum, item, i) => {
    const product = results[i]?.data;
    return sum + (product ? Number(product.price ?? 0) * item.quantity : 0);
  }, 0);

  // Empty state
  if (basket.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <ShoppingBasketOutlinedIcon
          sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          Your basket is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything yet.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Browse products
        </Button>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Button
        onClick={() => navigate("/")}
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, px: 0, color: "text.secondary" }}
      >
        Continue shopping
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Basket ({totalItems})
        </Typography>
        <Button color="error" onClick={() => setConfirmClearOpen(true)}>
          Clear basket
        </Button>
      </Box>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        {/* Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {basket.map((item, i) => {
              const product = results[i]?.data;

              // Product failed to load / no longer exists
              if (!product) {
                return (
                  <Alert
                    key={item.id}
                    severity="warning"
                    variant="outlined"
                    action={
                      <IconButton
                        color="inherit"
                        onClick={() => removeFromBasket(item.id)}
                        aria-label="Remove from basket"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  >
                    This product is no longer available.
                  </Alert>
                );
              }

              const price = Number(product.price ?? 0);

              return (
                <Paper
                  key={item.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  {/* Image */}
                  <Box
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                      width: 96,
                      height: 96,
                      flexShrink: 0,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {product.imageUrl ? (
                      <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.name ?? "Product"}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No image
                      </Typography>
                    )}
                  </Box>

                  {/* Name + unit price */}
                  <Box sx={{ flex: 1, minWidth: 140 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, cursor: "pointer" }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${price.toFixed(2)} each
                    </Typography>
                  </Box>

                  {/* Quantity */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 36, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Line total */}
                  <Typography
                    sx={{ minWidth: 80, textAlign: "right", fontWeight: 700 }}
                  >
                    ${(price * item.quantity).toFixed(2)}
                  </Typography>

                  {/* Remove */}
                  <IconButton
                    color="error"
                    onClick={() => removeFromBasket(item.id)}
                    aria-label="Remove from basket"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Paper>
              );
            })}
          </Box>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={{ p: 3, position: { md: "sticky" }, top: { md: 24 } }}
          >
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">
                Items ({totalItems})
              </Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography color="text.secondary">Shipping</Typography>
              <Typography color="text.secondary">
                Calculated at checkout
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Clear basket confirmation */}
      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        aria-labelledby="clear-basket-title"
      >
        <DialogTitle id="clear-basket-title">Clear basket?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove all {totalItems} item(s) from your basket. This
            action can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmClearOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              clearBasket();
              setConfirmClearOpen(false);
            }}
          >
            Clear basket
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
