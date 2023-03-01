[DataContract]
public class SalesOrder
{
    public string CustomerName { get; set; }
    public string OrderNumber { get; set; }
    public decimal AmountPaid { get; set; }
}
