[DataContract]
public class SalesOrderLine
{
    public Product Product { get; set; }
    public SalesOrder SalesOrder { get; set; }
    public decimal Quantity { get; set; }
}
