import { useState } from "react";
import { Link } from "react-router";
import type { PaginationParams } from "../../lib/types/common";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { useGetAllProducts } from "../../lib/hooks/useProduct";

export default function ProductsList() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 12,
  });

  const data = useGetAllProducts(pagination);

  if (data.isPending) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <Skeleton variant="rectangular" height={320} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (data.isError) {
    return <Alert severity="error">{data.error.message}</Alert>;
  }

  const list = data.data;

  if (!list || list.items.length === 0) {
    return <Alert severity="info">No products found.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
        Products
      </Typography>

      <Grid container spacing={3} sx={{p:2}}>
        {list.items.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <CardMedia
                component="img"
                image={p.imageUrl ?? ""}
                alt={p.name ?? ""}
                sx={{ aspectRatio: "1 / 1", objectFit: "cover" }}
              />
              <CardContent
                sx={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Typography noWrap sx={{ fontWeight: 600 }}>
                  {p.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  ${p.price}
                </Typography>
                <Button
                  component={Link}
                  to={`/product/${p.id}`}
                  variant="outlined"
                  sx={{ mt: "auto" }}
                >
                  View product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {list.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={list.totalPages}
            page={list.currentPage}
            onChange={(_, page) => setPagination((prev) => ({ ...prev, page }))}
          />
        </Box>
      )}
    </Box>
  );
}
