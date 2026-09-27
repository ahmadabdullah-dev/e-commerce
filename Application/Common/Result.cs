namespace Application.Common;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int ErrorCode { get; set; }  

    public static Result<T> Success(T value) => new()
    {
        IsSuccess = true,
        Value = value
    };
    public static Result<T> Failure(string error, int errorCode) => new()
    {
        IsSuccess = false, 
        Error = error,
        ErrorCode = errorCode
    };
}