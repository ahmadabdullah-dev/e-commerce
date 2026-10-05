namespace Infrastructure;

public static class UserRoles
{
    public const string CUSTOMER = "Customer";
    public const string ADMIN = "Admin";
}
public static class EmailPurposes
{
    public const string EMAIL_CONFIRMATION = "EmailConfirmation";
    public const string PASSWORD_RESET = "PasswordReset";
    public const string EMAIL_UPDATE = "UpdateEmail";

}
public static class OrderStatuses
{
    public const string PENDING = "Pending";
    public const string PROCESSING = "Processing";
    public const string SHIPPED = "Shipped";
    public const string DELIVERED = "Delivered";
    public const string CANCELLED = "Cancelled";
}   
