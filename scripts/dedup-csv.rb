# Deups the query-clean.csv file.
# Writes to query-clean-deduped.csv

require('csv')
map = {};

CSV.foreach("./data/query-clean.csv") do |row|
  name, count = row
  map[name] ||= 0
  map[name] += count.to_i
end

CSV.open("./data/query-clean-deduped.csv", "wb") do |csv|
  map.each do |name, count|
    csv << [name, count]
  end
end