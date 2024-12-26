for i in $(seq 1 100); do
    echo "Running test with $i requests per second"
    ab -n $((i * 10)) -c $i http://46.101.111.107:3001/booktable
    sleep 1
done
