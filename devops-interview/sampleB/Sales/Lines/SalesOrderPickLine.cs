[DataContract]
public class SalesOrderPickLine
{
    public Product Product { get; set; }
    public SalesOrder SalesOrder { get; set; }
    public Location Location { get; set; }
    public decimal Quantity { get; set; }
}
